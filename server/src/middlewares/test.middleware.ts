import Express from 'express'

export const testMiddleware = (
  _req: Express.Request,
  _res: Express.Response,
  next: Express.NextFunction
) => {
  next()
}
