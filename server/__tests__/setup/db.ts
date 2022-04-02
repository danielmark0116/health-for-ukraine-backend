import config, { initPostgis } from '../../src/connectors/db'
import { getConnection, createConnection, ConnectionOptions } from 'typeorm'

// Run once per test file
export const testPostgresConfig: ConnectionOptions = {
  ...config,
  type: 'postgres',
  host: 'localhost',
  port: 5988,
  username: 'postgres',
  password: 'admin',
  database: 'hfu_test',
}

beforeAll(async () => {
  const conn = await createConnection(testPostgresConfig)
  await conn.runMigrations({ transaction: 'all' })

  await initPostgis(conn)
})

afterEach(() => {
  const connection = getConnection()
  const entities = connection.entityMetadatas

  entities.forEach(async (entity) => {
    if (entity.tableName === 'user') {
      return
    }

    const repository = connection.getRepository(entity.name)
    await repository.query(`TRUNCATE TABLE ${entity.tableName} CASCADE;`)
  })
})

afterAll(async () => {
  await getConnection().close()
})
