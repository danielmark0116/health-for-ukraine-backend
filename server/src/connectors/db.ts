import { ConnectionOptions, createConnection } from 'typeorm'
import * as path from 'path'

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'hfu_db', // name of docker-composes service
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: process.env.MODE === 'dev',
  entities: [path.join(__dirname, '../entities', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations', '**', '*.{ts,js}')],
  subscribers: [path.join(__dirname, '../subscribers', '**', '*.subscriber.{ts,js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export const connectToDb = () => {
  createConnection(config)
    .then((conn) => {
      console.log('Connected with DB')
      console.log('Is connected: ', conn.isConnected)
    })
    .catch((reason) => {
      console.log('Error while connecting with db')
      console.log(reason)
    })
}

export default config
