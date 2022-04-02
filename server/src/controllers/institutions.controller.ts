import Express from 'express'
import type { Voivodehip } from '../entities/institution.entity'
import * as InstitutionService from '../services/institution.service'
import * as HereApiService from '../services/here-api.service'

export const getAllInstitutions = async (req: Express.Request, res: Express.Response) => {
  try {
    const query = req?.query || {}

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

export const getAllInstitutionsWithinRadius = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const { lat, lng } = req.query || { lat: null, lng: null }

    if ([lat, lng].every((e) => !e)) {
      throw 'Invalid query parameters'
    }

    const institutions = await InstitutionService.getAllInstitutionsWithinRadius({
      radius: 90_000,
      currentLng: Number(lng),
      currentLat: Number(lat),
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
    const locationId = req.body?.locationId || ''

    const { id: locationExtId, ...location } = await HereApiService.lookupPlaceById(locationId)

    const position = {
      lat: location.position.lat,
      lng: location.position.lng,
    }

    const institution = await InstitutionService.createInstitutionWithLocation({
      ...req.body,
      city: location.address?.city || 'Unknown',
      location: { ...location, ...position, locationExtId },
    })

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

export const distinctCities = async (req: Express.Request, res: Express.Response) => {
  try {
    const query = req?.query || {}

    const cities = await InstitutionService.distinctInstitutionsCities(query)

    res.json({
      cities,
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
