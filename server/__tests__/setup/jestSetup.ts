process.env.SERVER_PORT = '7001'
process.env.MODE = 'test'
process.env.JWT_SECRET = 'secret'
process.env.GOOGLE_CLIENT_ID = 'X'
process.env.GOOGLE_CLIENT_SECRET = 'X'
process.env.GOOGLE_CALLBACK_URL = 'X'
process.env.SENDGRID_API_KEY = 'X'
process.env.HERE_API_KEY = 'HERE_API_KEY'

jest.mock('../../src/connectors/db', () => ({
  connectToDbSynchronous: jest.fn(),
  connectToDb: jest.fn(),
}))

jest.mock('../../src/connectors/redis', () => ({
  connectToRedis: jest.fn,
}))
