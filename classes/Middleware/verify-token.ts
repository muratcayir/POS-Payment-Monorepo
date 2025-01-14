/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-shadow */
import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import { redisClient } from 'redis-manager/redis-client'
import { jwtService } from './jwt'
import { ORMAPI_KEY_PREFIX } from './utils'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
})

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(401).send({ message: 'Refresh token gerekli.' })
  }

  try {
    const payload = jwtService.verify(refreshToken) as any

    const redisToken = await redisClient.hGet(`${ORMAPI_KEY_PREFIX}: ${payload.uId}`, 'data')

    if (redisToken) {
      const sessionData = JSON.parse(redisToken)
      if (sessionData.sessionRefreshToken === refreshToken) {
        const newAccessToken = jwtService.signAccessToken({
          uId: payload.uId,
          name: payload.name,
          surName: payload.surName,
          userName: payload.userName,
          distributor_id: payload.distributor_id,
        })

        const newRefreshToken = jwtService.signRefreshToken({
          uId: payload.uId,
          name: payload.name,
          surName: payload.surName,
          userName: payload.userName,
          distributor_id: payload.distributor_id,
        })

        sessionData.sessionToken = newAccessToken
        sessionData.sessionRefreshToken = newRefreshToken

        await redisClient.hSet(`${ORMAPI_KEY_PREFIX}:${payload.uId}`, 'data', JSON.stringify(sessionData))

        return res.status(200).send({
          message: 'Oturum bilgileri başarıyla düzenlendi.',
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      }
    }

    return res.status(401).send({ message: 'Geçersiz refresh token.' })
  } catch {
    return res.status(401).send({ message: 'Geçersiz veya süresi dolmuş refresh token.' })
  }
}

export const preRegistrationAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1]

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token missing.' })
  }

  try {
    const decoded = jwtService.verify(accessToken) as any

    req.user = decoded
    return next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired.' })
    }
    return res.status(401).json({ message: 'Invalid access token.' })
  }
}

export const postRegistrationAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1]

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token missing.' })
  }

  try {
    const decoded = jwtService.verify(accessToken) as any

    const redisSessionData = await redisClient.hGet(`${ORMAPI_KEY_PREFIX}:${decoded.userId}`, 'data')

    if (redisSessionData) {
      const sessionData = JSON.parse(redisSessionData)
      if (sessionData.sessionAccessToken === accessToken) {
        req.user = decoded
        return next()
      }
    }

    return res.status(401).json({ message: 'Invalid session data.' })
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired.' })
    }
    return res.status(401).json({ message: 'Invalid access token.' })
  }
}
