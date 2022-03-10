import { createClient } from 'redis'

export const redisClient = createClient({
  url: `redis://hfu_redis:6379`,
  password: process.env.REDIS_PASSWORD,
})

export const connectToRedis = () => {
  redisClient.on('error', (e) => console.log('Redis client error: ' + e))
  redisClient.on('ready', () => console.log('Connected to Redis'))
  ;(async () => {
    try {
      await redisClient.connect()
    } catch (e) {
      throw e
    }
  })()
}
