import type { Express } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from '../swagger/swagger.json'

export const swaggerLoader = (app: Express) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
}
