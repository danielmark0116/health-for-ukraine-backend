import jwt from 'jsonwebtoken'
import { User } from '../entities/user.entity'
import { getRepository } from 'typeorm'
import { isEmail } from 'class-validator'
import * as UserService from '../services/user.service'

export const generateJWTToken = (userId: string): string => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 * 30 * 9 }
  ) // in seconds
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: Partial<User>; token: string }> => {
  try {
    if (!isEmail(email)) {
      throw 'Invalid email format'
    }

    const user = await getRepository(User).findOne(undefined, {
      where: { email },
      select: ['id', 'password_hash', 'email'],
    })

    if (!user) {
      throw 'Invalid credentials'
    }

    const isPasswordCorrect = await UserService.verifyPassword(password, user.password_hash)

    if (!isPasswordCorrect) {
      throw 'Invalid credentials'
    }

    user.hideHashedPassword()

    const token = generateJWTToken(user.id)

    return { user, token }
  } catch (e) {
    throw e
  }
}
