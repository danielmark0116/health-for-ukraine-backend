import { connectToDbSynchronous } from '../connectors/db'
import { connectToRedis } from '../connectors/redis'
import * as InstitutionsService from '../services/institution.service'
import * as HereApiService from '../services/here-api.service'
import { Location } from '../entities/location.entity'
import { getRepository } from 'typeorm'
import { Institution } from '../entities/institution.entity'

const addLocationToInstitutions = async () => {
  try {
    console.log('Run task: addLocationToInstitutions')

    await connectToDbSynchronous()
    connectToRedis()

    const institutions = await InstitutionsService.getAllInstitutions({ voivodeship: '*' })

    for (let institution of institutions) {
      if (!institution.location) {
        const [possibleCity] = await HereApiService.autocompleteCities(institution.city)

        const { id, ...placeData } = await HereApiService.lookupPlaceById(possibleCity.id)

        const { lat, lng } = placeData.position

        const newLocation = getRepository(Location).create({
          ...placeData,
          locationExtId: id,
          lat: String(lat),
          lng: String(lng),
        })

        const location = await getRepository(Location).save(newLocation)

        await getRepository(Institution)
          .createQueryBuilder()
          .update(Institution)
          .set({ location })
          .where('id = :id', { id: institution.id })
          .execute()
      }
    }
  } catch (e) {
    console.log('There was an error while trying to run the task')
    console.log(e)
  } finally {
    console.log('Task run successfully')
  }
}

addLocationToInstitutions()
