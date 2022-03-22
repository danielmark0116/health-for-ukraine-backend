import Express from 'express'
import { composedInstitutionValidatorMiddleware } from '../validators/institution.validator'
import * as InstitutionsController from '../controllers/institutions.controller'

const router = Express.Router()

router.get('/cities', InstitutionsController.distinctCities)
router.get('/', InstitutionsController.getAllInstitutions)
router.post('/', composedInstitutionValidatorMiddleware, InstitutionsController.createInstitution)

export default router
