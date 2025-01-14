import { Request, Response } from 'express'
import { User, Session } from 'utils/models'
import { redisClient } from 'redis-manager/redis-client'
import { handleTransactionError } from 'utils/common'
import Errors, { CustomError } from 'utils/custom-error'
import { sequelize } from 'config/database'
import { ORMAPI_KEY_PREFIX, SESSION_EXPIRATION_TIME, SESSION_KEY_PREFIX } from '../../../Middleware/utils'
import { AddAddressSchema, addAddressSchema, addEmailSchema, AddEmailSchema } from '../models'
import { fetchAddresses } from '../services/addresses'
import { jwtService } from '../../../Middleware/jwt'

export const addEmail = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const input: AddEmailSchema = addEmailSchema.parse(req.body)
    const { sessionId } = req.cookies

    const redisSession = await redisClient.hGet(`${SESSION_KEY_PREFIX}:${sessionId}`, 'signup')

    if (!redisSession) {
      throw new Error('Session information not found')
    }

    const redisDataString = JSON.parse(redisSession)

    const existingEmail = await User.findOne({ where: { email: input.email } })

    if (existingEmail) {
      throw new CustomError({ error: Errors.OtpAuthenticator['1007'], params: { email: input.email } })
    }

    const { phone, tcno, birthday, name, surname } = redisDataString

    const user = await User.create(
      {
        name,
        surname,
        tcno,
        birthdate: new Date(birthday),
        email: input.email,
        phone,
      },
      { transaction },
    )

    const tokenPayload = {
      userId: user.id,
      name,
      surname,
      username: `${user.name
        .normalize('NFD')
        .replace(/[\s\u0300-\u036F]/g, '')
        .toLowerCase()}${user.surname
        .normalize('NFD')
        .replace(/[\s\u0300-\u036F]/g, '')
        .toLowerCase()}`,
      email: input.email,
    }

    const accessToken = jwtService.signAccessToken(tokenPayload)
    const refreshToken = jwtService.signRefreshToken(tokenPayload)

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
    await transaction.commit()
    res.status(201).send({ message: `${input.email} added successfully.`, token: { accessToken, refreshToken } })
  } catch (error: any) {
    await transaction.rollback()
    await handleTransactionError(error, res)
  }
}

export const addAddress = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const input: AddAddressSchema = addAddressSchema.parse(req.body)

    const { userId } = req.user

    if (!userId) {
      throw new Error('User ID not found')
    }

    const addresses = await fetchAddresses()

    const cityId = Number(input.city)
    const districtId = Number(input.district)
    const selectedCity = addresses.find((c: any) => c.id === cityId)
    const selectedDistrict = selectedCity?.ilceler.find((d: any) => d.id === districtId)

    if (!selectedCity || !selectedDistrict) {
      throw new CustomError({ error: Errors.OtpAuthenticator[1008] })
    }

    const user = await User.findByPk(userId)

    if (!user) {
      throw new Error('User not found')
    }

    user.city = selectedCity.il
    user.district = selectedDistrict.ilce
    user.address = input.address

    await user.save({ transaction })
    await transaction.commit()
    res.status(200).send({ message: 'Address added successfully' })
  } catch (error: any) {
    await transaction.rollback()
    await handleTransactionError(error, res)
  }
}
