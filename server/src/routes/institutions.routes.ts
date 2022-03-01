import Express from 'express'
import * as InstitutionsController from '../controllers/institutions.controller'

const router = Express.Router()

router.get('/', InstitutionsController.getAllInstitutions)
router.post('/', InstitutionsController.createInstitution)

export default router
