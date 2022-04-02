import { Need } from '../entities/need.entity'
import { getRepository, ILike } from 'typeorm'
import { validateNeed } from '../validators/need.validator'

interface NeedsFilters {
  city?: string
}

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

export const getAllNeeds = async ({ city = '*' }: NeedsFilters): Promise<Need[]> => {
  try {
    const needs = await getRepository(Need).find(
      city === '*'
        ? undefined
        : {
            where: {
              city: ILike(city),
            },
          }
    )

    return needs
  } catch (_) {
    throw 'Error while fetching needs'
  }
}
