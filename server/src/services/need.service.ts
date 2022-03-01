import { Need } from '../entities/need.entity'
import { getRepository } from 'typeorm'
import { validateNeed } from '../validators/need.validator'

export const createNeed = async (needData: Partial<Need>): Promise<Need> => {
  try {
    const newNeed = getRepository(Need).create(needData)

    const errors = await validateNeed(newNeed)

    if (errors.length !== 0) {
      throw errors
    }

    await getRepository(Need).save(newNeed)

    const need = await getRepository(Need).findOne(newNeed.id)

    if (!need) {
      throw 'Error while creating need'
    }

    return need
  } catch (e) {
    throw e
  }
}

export const getAllNeeds = async (): Promise<Need[]> => {
  try {
    const needs = await getRepository(Need).find()

    return needs
  } catch (e) {
    throw 'Error while fetching needs'
  }
}
