import { Server } from 'http'
import request, { SuperAgentTest } from 'supertest'
import { app } from '../../server'

let server: Server
let agent: SuperAgentTest

beforeAll((done) => {
  server = app.listen(Number(process.env.SERVER_PORT), (err) => {
    if (err) return done(err)

    agent = request.agent(server) // since the application is already listening, it should use the allocated port

    done()
  })
})

afterAll((done) => {
  server?.close(done)
})

export { agent }
