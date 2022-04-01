import { setupServer } from 'msw/node'
import { hereApiMocks } from './here-api.mocks'

export const server = setupServer(...hereApiMocks)
