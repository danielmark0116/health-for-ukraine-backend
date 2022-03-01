import Express from 'express'
import * as InstitutionService from '../services/institution.service'

export const getAllInstitutions = async (_req: Express.Request, res: Express.Response) => {
  try {
    const institutions = await InstitutionService.getAllInstitutions()

    res.json({
      institutions,
      success: true,
      error: false,
      msg: 'Fetched all institutions',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Get all institutions error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}

export const createInstitution = async (req: Express.Request, res: Express.Response) => {
  try {
    const institution = await InstitutionService.createInstitution(req.body)

    res.json({
      institution,
      success: true,
      error: false,
      msg: 'Created an institution',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Create institution error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
