import Express from 'express'
import {
  composedInstitutionValidatorMiddleware,
  institutionsDistinctCitiesValidationMiddleware,
  institutionsWithinRadiusValidationMiddleware,
} from '../validators/institution.validator'
import * as InstitutionsController from '../controllers/institutions.controller'

const router = Express.Router()

router.get(
  '/cities',
  institutionsDistinctCitiesValidationMiddleware,
  InstitutionsController.distinctCities
)
router.get('/', InstitutionsController.getAllInstitutions)
router.get(
  '/withinRadius',
  institutionsWithinRadiusValidationMiddleware,
  InstitutionsController.getAllInstitutionsWithinRadius
)
router.post('/', composedInstitutionValidatorMiddleware, InstitutionsController.createInstitution)

export default router
