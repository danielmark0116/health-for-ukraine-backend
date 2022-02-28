import Express from 'express'
import path from 'path'
import * as MailerService from '../services/mailer.service'
import * as AuthService from '../services/auth.service'

// here, call services to trigger some actions

export const handleOAuthRedirect = (req: Express.Request, res: Express.Response) => {
  const { id: userId, email } = req?.user || { id: '', email: '' }
  const token = AuthService.generateJWTToken(userId)

  if (email) {
    MailerService.sendAccountConfirmationEmail(email)
  }

  res.redirect('/auth/oauth_redirect/' + token)
}

export const oauthRedirect = (_req: Express.Request, res: Express.Response) => {
  res.setHeader('Content-Security-Policy', "script-src 'unsafe-inline';")
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, '../../../public', 'oauth_redirect.html'))
}

export const loginUser = async (req: Express.Request, res: Express.Response) => {
  try {
    const email = req?.body?.email || ''
    const password = req?.body?.password || ''

    const { user, token } = await AuthService.loginUser(email, password)

    res.status(200).json({
      msg: 'Login success',
      error: false,
      success: true,
      token,
      user,
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Login user error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
