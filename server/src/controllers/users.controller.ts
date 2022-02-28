import Express from 'express'
import * as UserService from '../services/user.service'

// here, call services to trigger some actions

export const getUsers = async (_req: Express.Request, res: Express.Response) => {
  try {
    const users = await UserService.getUsers()

    res.json({
      users,
      success: true,
      error: false,
      msg: 'Fetched all users',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Get all users error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}

export const createUser = async (req: Express.Request, res: Express.Response) => {
  try {
    const { body } = req

    const user = await UserService.createUser(body)

    res.status(201).json({
      user,
      success: true,
      error: false,
      msg: 'Created new user',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Create user error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}

export const getCurrentUser = async (req: Express.Request, res: Express.Response) => {
  try {
    const userId = req?.user?.id || ''

    const user = await UserService.getUserById(userId)

    res.status(200).json({
      user,
      success: true,
      error: false,
      msg: 'Fetched current user',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Could not get current user',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
