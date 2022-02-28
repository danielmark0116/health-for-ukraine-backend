import Express from 'express'
import passport from 'passport'
import * as AuthController from '../controllers/auth.controller'

const router = Express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/fail',
    session: false,
  }),
  AuthController.handleOAuthRedirect
)

router.get('/oauth_redirect', AuthController.oauthRedirect)
router.get('/oauth_redirect/:token', AuthController.oauthRedirect)

router.get('/fail', (_req, res: Express.Response) => {
  res.send('Auth fail')
})

router.post('/login', AuthController.loginUser)

// to be deleted
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req: Express.Request, res: Express.Response) => {
    console.log(req?.user ?? 'no user data')
    res.send('Protected route, have access')
  }
)

export default router
