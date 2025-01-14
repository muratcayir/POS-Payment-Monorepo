import Errors, { CustomError } from 'utils/custom-error'
import { Request, Response } from 'express'
import { Otp, Session, User } from 'utils/models'
import { differenceInSeconds } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { redisClient } from 'redis-manager/redis-client'
import { handleTransactionError } from 'utils/common'
import { sequelize } from 'config/database'
import { z } from 'zod'
import { sendCode } from 'sms-manager/sms'
import { ORMAPI_KEY_PREFIX, SESSION_EXPIRATION_TIME, SESSION_KEY_PREFIX } from '../../../Middleware/utils'
import { jwtService } from '../../../Middleware/jwt'
import { extractAreaCodeAndPhoneNumber, generateOTP } from '../utils'
import { authStatus, sendOtpSchemaInput, verifyOtpSchemaInput } from '../models'
import { environmentConfig } from '../environment-config'

// Constants
export const OTP_VALIDATE_INTERVAL = 180 // OTP validity in seconds
const OTP_RATE_LIMIT = 3 // OTP retry limit
const OTP_RATE_INTERVAL = 100 // Interval for rate limiting OTP requests in seconds
const DEMO_PHONE_NUMBER = '905528411923'
const USE_DEVELOPMENT_OTP = environmentConfig.useDevelopmentOtp === 'true'
const DEVELOPMENT_CODE = environmentConfig.developmentCode

/**
 * Helper function to check OTP rate limit.
 */
const isRateLimited = (otpRecords: any[], now: Date): boolean => {
  if (otpRecords.length === OTP_RATE_LIMIT) {
    const lastOtpTime = otpRecords[otpRecords.length - 1].dataValues.createdAt
    if (lastOtpTime && differenceInSeconds(now, new Date(lastOtpTime)) <= OTP_RATE_INTERVAL) {
      return true
    }
  }
  return false
}

/**
 * Internal function to handle OTP sending logic.
 */
const sendOtpInternal = async (phone: string, now: Date): Promise<void> => {
  const otpRecords = await Otp.findAll({
    where: { phone },
    order: [['createdAt', 'DESC']],
    limit: OTP_RATE_LIMIT,
  })

  if (isRateLimited(otpRecords, now)) {
    throw new CustomError({ error: Errors.OtpAuthenticator['1001'] })
  }

  const otp = generateOTP()
  const smsMessage = `Faturamatik Doğrulama Kodu: ${otp}`

  await Otp.upsert({
    phone,
    secretOtp: otp,
    latestOtpRequestAt: now,
    tryCount: 0,
  })

  await sendCode(phone, smsMessage)
}

/**
 * API endpoint to send OTP to a user.
 */
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const { phone: rawPhone } = sendOtpSchemaInput.parse(req.body)
    const extractedPhone = extractAreaCodeAndPhoneNumber(rawPhone)

    if (!extractedPhone) {
      throw new CustomError({ error: Errors.OtpAuthenticator['1009'] })
    }

    const { phoneNumber } = extractedPhone

    let { sessionId } = req.cookies

    if (!sessionId) {
      sessionId = uuidv4()
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
    }

    const userInfoRedis = JSON.stringify({ phone: phoneNumber })

    await sendOtpInternal(phoneNumber, new Date())

    await redisClient.hSet(`${SESSION_KEY_PREFIX}:${sessionId}`, 'signup', userInfoRedis)
    await redisClient.expire(`${SESSION_KEY_PREFIX}:${sessionId}`, SESSION_EXPIRATION_TIME)

    await transaction.commit()

    res.status(200).send({
      message: 'Verification code sent',
      otpRemainingTime: OTP_VALIDATE_INTERVAL,
    })
  } catch (error: any) {
    await transaction.rollback()
    if (error instanceof z.ZodError) {
      res.status(400).send({
        message: 'Invalid phone number format',
        details: error.errors,
      })
    } else {
      await handleTransactionError(error, res)
    }
  }
}

/**
 * API endpoint to verify OTP.
 */
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const { otp } = verifyOtpSchemaInput.parse(req.body)
    const { sessionId } = req.cookies

    if (!sessionId) {
      throw new Error('Session ID not found')
    }

    const sessionDataString = await redisClient.hGet(`${SESSION_KEY_PREFIX}:${sessionId}`, 'signup')

    if (!sessionDataString) {
      throw new CustomError({ error: Errors.OtpAuthenticator['1006'] })
    }

    const { phone } = JSON.parse(sessionDataString)

    const codeRecord = await Otp.findOne({
      where: { phone },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'tryCount', 'latestOtpRequestAt', 'secretOtp'],
    })

    if (!otp || !codeRecord) {
      throw new CustomError({ error: Errors.OtpAuthenticator['1002'] })
    }

    const { tryCount, latestOtpRequestAt, secretOtp } = codeRecord

    if (latestOtpRequestAt && differenceInSeconds(Date.now(), latestOtpRequestAt) > OTP_VALIDATE_INTERVAL) {
      throw new CustomError({ error: Errors.OtpAuthenticator['1003'] })
    }

    if (tryCount >= OTP_RATE_LIMIT) {
      throw new CustomError({ error: Errors.OtpAuthenticator['1004'] })
    }

    if (otp !== secretOtp && !(USE_DEVELOPMENT_OTP && phone === DEMO_PHONE_NUMBER && otp === DEVELOPMENT_CODE)) {
      await Otp.update({ tryCount: tryCount + 1 }, { where: { id: codeRecord.id } })
      throw new CustomError({
        error: Errors.OtpAuthenticator['1005'],
        addons: { authStatus: authStatus.enum.AUTH_FAILED_INVALID_OTP },
      })
    }

    let accessToken: string
    let refreshToken: string

    const user = await User.findOne({ where: { phone } })

    if (user) {
      const tokenPayload = {
        userId: user.id,
        name: user.name,
        surname: user.surname,
        username: `${user.name
          .normalize('NFD')
          .replace(/[\s\u0300-\u036F]/g, '')
          .toLowerCase()}${user.surname
          .normalize('NFD')
          .replace(/[\s\u0300-\u036F]/g, '')
          .toLowerCase()}`,
        email: user.email,
        phone: user.phone,
      }
      accessToken = jwtService.signAccessToken(tokenPayload)
      refreshToken = jwtService.signRefreshToken(tokenPayload)

      await Session.create(
        {
          token: accessToken,
          refreshToken,
          userId: user.id,
        },
        { transaction },
      )

      const updatedSessionData = {
        ...tokenPayload,
        sessionAccessToken: accessToken,
        sessionRefreshToken: refreshToken,
      }
      const updatedSessionDataString = JSON.stringify(updatedSessionData)

      await redisClient.hSet(`${ORMAPI_KEY_PREFIX}:${user.id}`, 'data', updatedSessionDataString)
      await redisClient.expire(`${SESSION_KEY_PREFIX}:${sessionId}`, SESSION_EXPIRATION_TIME)
    } else {
      accessToken = jwtService.signAccessToken({ phone })
      refreshToken = jwtService.signRefreshToken({ phone })
    }

    await Otp.destroy({ where: { id: codeRecord.id } })
    await transaction.commit()

    res.status(200).send({
      message: 'Verification successful',
      token: { accessToken, refreshToken },
    })
  } catch (error: any) {
    await transaction.rollback()
    await handleTransactionError(error, res)
  }
}
