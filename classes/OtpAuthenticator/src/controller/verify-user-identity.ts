import { Request, Response } from 'express'
import Errors, { CustomError } from 'utils/custom-error'
import { handleTransactionError } from 'utils/common'
import { redisClient } from 'redis-manager/redis-client'
import { SESSION_KEY_PREFIX } from '../../../Middleware/utils'
import { TcNoServicesSchemaInput } from '../models'
import { verifyIdentity } from '../services/verify-identity'

export const verifyUserIdentity = async (req: Request, res: Response): Promise<any> => {
  try {
    const input: TcNoServicesSchemaInput = req.body

    const { phone } = req.user

    const { sessionId } = req.cookies

    if (!sessionId) {
      throw new CustomError({ error: Errors.OtpAuthenticator[1010] })
    }

    if (!input.tcno || !input.birthday) {
      throw new CustomError({ error: Errors.OtpAuthenticator[1011] })
    }

    const response = await verifyIdentity(input)

    if (response.statusCode === 200) {
      if (typeof response.body === 'object' && 'content' in response.body) {
        const { name, surname } = response.body.content.tcPerson.personInfo

        const userInfoRedis = JSON.stringify({ tcno: input.tcno, birthday: input.birthday, name, surname, phone })

        await redisClient.hSet(`${SESSION_KEY_PREFIX}:${sessionId}`, 'signup', userInfoRedis)

        await redisClient.expire(`${SESSION_KEY_PREFIX}:${sessionId}`, 3600)

        res.status(200).send(response.body)
      } else {
        res.status(400).send({ message: 'Identity verification failed.' })
      }
    }
  } catch (error: any) {
    await handleTransactionError(error, res)
  }
}
