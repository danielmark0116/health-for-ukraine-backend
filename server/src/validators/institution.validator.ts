import Express from 'express'
import { Institution, voivodeships } from '../entities/institution.entity'
import { validate, ValidationError } from 'class-validator'
import { getRepository } from 'typeorm'
import { body, query } from 'express-validator'
import { validateRequest } from './utils.validator'

export const validateInstitution = async (
  institutionData: Partial<Institution>
): Promise<ValidationError[]> => {
  const errors = await validate(institutionData, { skipMissingProperties: false })

  return errors
}

export const institutionValidationMiddleware = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const institution = getRepository(Institution).create({
    ...req.body,
    validated: false,
  })

  const errors = await validate(institution, { skipMissingProperties: false })

  if (errors.length > 0) {
    return res.status(400).json({
      msg: 'Institution validation error',
      error: true,
      success: false,
      errorData: errors,
    })
  }

  return next()
}

export const composedInstitutionValidatorMiddleware = [
  institutionValidationMiddleware,
  body('locationId').not().isEmpty().trim().escape(),
  validateRequest,
]

export const institutionsWithinRadiusValidationMiddleware = [
  query('lat').isFloat().trim().escape(),
  query('lng').isFloat().trim().escape(),
  validateRequest,
]

export const institutionsDistinctCitiesValidationMiddleware = [
  query('voivodeship').isIn([...voivodeships, '*']),
  validateRequest,
]
