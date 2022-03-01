import 'reflect-metadata'
import Express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import * as path from 'path'
import cors from 'cors'
import passport from 'passport'
// import UserRouter from './src/routes/users.routes'
// import AuthRouter from './src/routes/auth.routes'
import InstitutionsRouter from './src/routes/institutions.routes'
import NeedsRouter from './src/routes/needs.routes'
import { initPassport } from './src/passport/passport'
import { connectToDb } from './src/connectors/db'
import { swaggerLoader } from './src/loaders/swagger.loader'

const app = Express()
const port = Number(process.env.SERVER_PORT) || 7004

// ---------------------------------------------------
// ---------------------- LOADERS -----------
// ---------------------------------------------
if (process.env.MODE === 'dev') {
  app.use(morgan('tiny') as any)
}

connectToDb()

swaggerLoader(app)

app.use(cors())
app.use(helmet() as any)
app.use(Express.json() as any)
app.use(passport.initialize())
app.use(passport.session())

initPassport()
// initGoogleOAuth()

// ---------------------------------------------------
// ---------------------- STATIC CONTENT -----------
// ---------------------------------------------
app.use(
  '/.well-known',
  Express.static(path.join(__dirname, '../public'), {
    setHeaders: (res) => {
      res.type('application/json')
    },
  })
)

// ------------------------------------------------
// ------------------- ROUTERS ------------------
// ---------------------------------------------
// app.use('/api/users', UserRouter)
// app.use('/api/auth', AuthRouter)
// app.use('/auth', AuthRouter)
app.use('/api/institutions', InstitutionsRouter)
app.use('/api/needs', NeedsRouter)

// ------------------------------------------------
// ------------------- OTHER PATHS ------------------
// ---------------------------------------------
app.get('/account_confirm/:token', (_req: Express.Request, res: Express.Response) => {
  res.send('Account confirm fallback')
})

app.get('/', (_: Express.Request, res: Express.Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// ------------------------------------------------
// ------------------- APP INIT ------------------
// ---------------------------------------------
app.listen(port, () => {
  console.log('MODE: ', process.env.MODE)
  console.log('Server run on port: ', port)
})
