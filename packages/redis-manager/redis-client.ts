import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

export const redisClient = createClient({
  url: process.env.REDIS_URL,
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))
;(async () => {
  try {
    await redisClient.connect()
    console.log('Connected to Redis')
  } catch (error) {
    console.error('Failed to connect to Redis', error)
  }
})().catch((error) => {
  console.error('Unexpected error during Redis connection:', error)
})

export default redisClient
