import Express from 'express'
import { redisClient } from '../connectors/redis'
import { REDIS_CACHE_EXPIRY_TIMESPAN_SECONDS } from '../constants/redis.constants'

export const cacheResponseData = async (key: string, data: Record<string, unknown> | unknown[]) => {
  try {
    await redisClient.setEx(key, REDIS_CACHE_EXPIRY_TIMESPAN_SECONDS, JSON.stringify(data))

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getCachedResponseData = async <T>(key: string): Promise<T | null> => {
  try {
    const cachedData = await redisClient.get(key)

    if (cachedData) {
      console.log('Returning cached data for: ', key)
      return JSON.parse(cachedData)
    }

    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export const responseWithCache = async (
  req: Express.Request,
  res: Express.Response,
  data: unknown
) => {
  try {
    await redisClient.setEx(req.url, REDIS_CACHE_EXPIRY_TIMESPAN_SECONDS, JSON.stringify(data))

    res.status(200).json(data)
  } catch (e) {
    res.status(400).json({
      msg: 'Get all institutions error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
