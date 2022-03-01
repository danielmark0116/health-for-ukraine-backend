import { Institution } from '../entities/institution.entity'
import { validate, ValidationError } from 'class-validator'

export const validateInstitution = async (
  institutionData: Partial<Institution>
): Promise<ValidationError[]> => {
  const errors = await validate(institutionData, { skipMissingProperties: false })

  return errors
}
