import { Factory } from 'fishery'
import { Location } from '../../src/entities/location.entity'
import { faker } from '@faker-js/faker'
import { getRepository } from 'typeorm'

export const locationFactory = Factory.define<Omit<Location, 'id'>, Partial<Location>, Location>(
  ({ sequence, onCreate, params }) => {
    onCreate(async (location) => {
      const locationToSave = getRepository(Location).create(location)
      const savedLocation = await getRepository(Location).save(locationToSave)
      return savedLocation
    })

    const title = `${faker.address.cityName()}, ${faker.address.county()}, ${faker.address.country()}`

    return {
      title,
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
      resultType: 'locality',
      language: 'pl',
      locationExtId: String(sequence),
      ...params,
    }
  }
)
