import Express from 'express'
import type { Voivodehip } from '../entities/institution.entity'
import * as InstitutionService from '../services/institution.service'

export const getAllInstitutions = async (req: Express.Request, res: Express.Response) => {
  try {
    const query = req.query

    const institutions = await InstitutionService.getAllInstitutions({
      voivodeship: (query?.voivodeship as Voivodehip) || '*',
    })

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
