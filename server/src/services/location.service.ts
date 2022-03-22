import { Location } from '../entities/location.entity'
import { getRepository } from 'typeorm'

export const createLocation = async (locationData: Omit<Location, 'id'>) => {
  try {
    const location = getRepository(Location).create(locationData)

    await getRepository(Location).save(location)

    return location
  } catch (e) {
    throw e
  }
}
