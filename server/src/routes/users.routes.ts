import Express from 'express'
import passport from 'passport'
import * as UsersController from '../controllers/users.controller'

const router = Express.Router()

router.get('/', UsersController.getUsers)
router.get('/me', passport.authenticate('jwt', { session: false }), UsersController.getCurrentUser)
router.post('/', UsersController.createUser)

export default router
