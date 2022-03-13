import Express from 'express'
import { validationResult } from 'express-validator'

export const validateRequest = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  return res.status(400).json({
    msg: 'Validation error',
    error: true,
    success: false,
    errorData: errors,
  })
}
