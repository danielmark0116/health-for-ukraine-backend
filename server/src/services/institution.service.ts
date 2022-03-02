import { Institution } from '../entities/institution.entity'
import { getRepository } from 'typeorm'
import { validateInstitution } from '../validators/institution.validator'

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

export const getAllInstitutions = async (): Promise<Institution[]> => {
  try {
    const institutions = await getRepository(Institution).find({ where: { validated: true } })

    return institutions
  } catch (e) {
    throw 'Error while saving institution'
  }
}
