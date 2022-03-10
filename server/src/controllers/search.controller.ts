import Express from 'express'
import { responseWithCache } from '../services/cache.service'
import * as HereApiService from '../services/here-api.service'

export const searchCities = async (req: Express.Request, res: Express.Response) => {
  try {
    const { text } = req.query || { text: '' }

    const cities = await HereApiService.autocompleteCities(text as string)

    responseWithCache(req, res, {
      cities,
      success: true,
      error: false,
      msg: 'Fetched autocompleted list of possible matches | CITIES',
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Search cities error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}

export const lookupPlaceById = async (req: Express.Request, res: Express.Response) => {
  try {
    const { id } = req.query || { id: '' }

    const place = await HereApiService.lookupPlaceById(id as string)

    responseWithCache(req, res, {
      place,
      success: true,
      error: false,
      msg: 'Successfully looked up the place of given id: ' + id,
    })
  } catch (e) {
    res.status(400).json({
      msg: 'Place lookup error',
      error: true,
      success: false,
      errorData: e,
    })
  }
}
