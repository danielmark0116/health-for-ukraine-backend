import { Need } from '../entities/need.entity'
import { validate, ValidationError } from 'class-validator'

export const validateNeed = async (needData: Partial<Need>): Promise<ValidationError[]> => {
  const errors = await validate(needData, { skipMissingProperties: false })

  return errors
}
