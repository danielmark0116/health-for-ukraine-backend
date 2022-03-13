import { Institution, Voivodehip, voivodeships } from '../entities/institution.entity'
import { Location } from '../entities/location.entity'
import { getRepository, In, getManager } from 'typeorm'

interface InstitutionsFilters {
  voivodeship?: Voivodehip | '*'
}

export const createInstitution = async (
  institutionData: Partial<Institution>
): Promise<Institution> => {
  try {
    const newInstitution = getRepository(Institution).create({
      ...institutionData,
      validated: false,
    })

    await getRepository(Institution).save(newInstitution)

    const institution = await getRepository(Institution).findOne(newInstitution.id)

    if (!institution) {
      throw 'Error while creating institution'
    }

    return institution
  } catch (e) {
    throw e
  }
}

export const createInstitutionWithLocation = async (
  institutionData: Partial<Institution>
): Promise<Institution> => {
  try {
    const { location } = institutionData

    const newInstitution = getRepository(Institution).create({
      ...institutionData,
      validated: false,
    })

    const newLocation = getRepository(Location).create({
      id: undefined,
      locationExtId: location?.id,
      ...location,
    })

    await getManager().transaction(async (transactionalEntityManager) => {
      const location = await transactionalEntityManager.save(newLocation)
      newInstitution.location = location
      await transactionalEntityManager.save(newInstitution)
    })

    const institution = await getRepository(Institution).findOne(newInstitution.id, {
      relations: ['location'],
    })

    if (!institution) {
      throw 'Error while creating institution'
    }

    return institution
  } catch (e) {
    throw e
  }
}

export const getAllInstitutions = async ({
  voivodeship = '*',
}: InstitutionsFilters): Promise<Institution[]> => {
  try {
    const institutions = await getRepository(Institution).find({
      where: {
        validated: true,
        voivodeship: In(voivodeship === '*' ? [...voivodeships] : [voivodeship]),
      },
    })

    return institutions
  } catch (e) {
    throw 'Error while saving institution'
  }
}

export const distinctInstitutionsCities = async ({
  voivodeship = '*',
}: InstitutionsFilters): Promise<string[]> => {
  try {
    if (![...voivodeships, '*'].includes(voivodeship)) {
      throw 'Incorrect voivodeship query parameter'
    }

    const institutionsCities = await getRepository(Institution)
      .createQueryBuilder('institution')
      .where('institution.voivodeship in (:...voivodeships)', {
        voivodeships: voivodeship === '*' ? voivodeships : [voivodeship],
      })
      .andWhere('institution.validated = TRUE')
      .select('DISTINCT ON (LOWER(institution.city)) institution.city')
      .getRawMany()

    return institutionsCities.map((i) => i.city)
  } catch (e) {
    throw 'Could not distinct on institution.city'
  }
}
