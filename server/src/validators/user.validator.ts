import { User } from '../entities/user.entity'
import { validate, ValidationError, length } from 'class-validator'

export const validateUser = async (userData: Partial<User>): Promise<ValidationError[]> => {
  const user = new User()

  user.password = userData.password || ''

  const errors = await validate(user, { skipMissingProperties: true })

  return errors
}

export const validateUserPassword = (userData: Partial<User>) => {
  return length(userData?.password, 8, 49)
}
