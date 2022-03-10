import Express from 'express'
import { redisClient } from '../connectors/redis'

export const cacheMiddleware = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (req.method !== 'GET') {
      return next()
    }
    const data = await redisClient.get(req.url)

    if (!data) {
      return next()
    }

    console.log('Using cached response: ', req.url)

    res.json(JSON.parse(data))
  } catch (e) {
    res.status(400).json({
      msg: 'Caching error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
