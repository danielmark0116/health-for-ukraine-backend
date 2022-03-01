import Express from 'express'
import * as NeedsService from '../services/need.service'

export const getAllNeeds = async (_req: Express.Request, res: Express.Response) => {
  try {
    const needs = await NeedsService.getAllNeeds()

    res.json({
      needs,
      success: true,
      error: false,
      msg: 'Fetched all needs',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Get all needs error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}

export const createNeed = async (req: Express.Request, res: Express.Response) => {
  try {
    const need = await NeedsService.createNeed(req.body)

    res.json({
      need,
      success: true,
      error: false,
      msg: 'Created a need',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Create need error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
