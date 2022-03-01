import Express from 'express'
import * as NeedsController from '../controllers/needs.controller'

const router = Express.Router()

router.get('/', NeedsController.getAllNeeds)
router.post('/', NeedsController.createNeed)

export default router
