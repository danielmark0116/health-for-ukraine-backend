import { Institution, Voivodehip, voivodeships } from '../entities/institution.entity'
import { getRepository, In } from 'typeorm'
import { validateInstitution } from '../validators/institution.validator'

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

    const errors = await validateInstitution(newInstitution)

    if (errors.length !== 0) {
      throw errors
    }

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
