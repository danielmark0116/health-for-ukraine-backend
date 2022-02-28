import bcrypt from 'bcrypt'
import { validateUser, validateUserPassword } from '../validators/user.validator'
import { getRepository } from 'typeorm'
import { User } from '../entities/user.entity'
import { SALT_ROUNDS } from '../constants/bcrypt.constants'

export const getUsers = async (): Promise<User[]> => {
  const users = await getRepository(User).find({
    relations: ['companies'],
    join: {
      alias: 'user',
      leftJoinAndSelect: {
        teamMemberships: 'user.teamMemberships',
        team: 'teamMemberships.team',
        teamCreator: 'team.teamCreator',
      },
    },
  })

  return users
}

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const user = await getRepository(User).findOne(userId, {
      relations: ['companies'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          teamMemberships: 'user.teamMemberships',
          team: 'teamMemberships.team',
          teamCreator: 'team.teamCreator',
        },
      },
    })

    if (!user) {
      throw 'No such user'
    }

    return user
  } catch (e) {
    throw e
  }
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const validationErrors = await validateUser(userData)

  const isUserDataValid = validationErrors.length === 0
  const isPasswordFormatValid = validateUserPassword(userData)

  if (!isUserDataValid) {
    throw validationErrors
  }

  if (!isPasswordFormatValid) {
    throw 'Password has invalid format'
  }

  const passwordToHash = userData.password

  const hashedPassword = await hashPassword(passwordToHash!)

  const newUser = getRepository(User).create(userData)

  newUser.password_hash = hashedPassword

  await getRepository(User).save(newUser)

  const output = await getRepository(User).findOne(newUser.id)

  if (!output) {
    throw 'Error while saving user'
  }

  return output
}

export const hashPassword = async (passwordToHash: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(passwordToHash, SALT_ROUNDS)

    return hashedPassword
  } catch (e) {
    throw new Error('Could not hash password')
  }
}

export const verifyPassword = async (
  plainStringPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(plainStringPassword, hashedPassword)

    return result
  } catch (e) {
    throw new Error('Could not verify password')
  }
}
