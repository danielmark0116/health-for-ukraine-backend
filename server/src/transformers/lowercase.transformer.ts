import { ValueTransformer } from 'typeorm'

export const lowercase: ValueTransformer = {
  to: (entityValue: string) => entityValue.toLocaleLowerCase(),
  from: (databaseValue: string) => databaseValue,
}
