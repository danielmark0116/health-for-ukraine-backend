import { Voivodehip } from '../../../src/entities/institution.entity'
import {
  getAllInstitutionsWithinRadius,
  distinctInstitutionsCities,
} from '../../../src/services/institution.service'
import { institutionFactory } from '../../factories/institution.factory'
import { locationFactory } from '../../factories/location.factory'
import {
  gdanskCoords,
  knurowCoords,
  warsawCoords,
  gliwiceCoords,
  katowiceCoords,
} from '../../mocks/mockLocations'

describe('getAllInstitutionsWithinRadius/1', () => {
  beforeEach(async () => {
    const katowice = await locationFactory.create({ ...katowiceCoords, title: 'Katowice' })
    const gliwice = await locationFactory.create({ ...gliwiceCoords, title: 'Gliwice' })
    const knurow = await locationFactory.create({ ...knurowCoords, title: 'Knurow' })
    const warsaw = await locationFactory.create({ ...warsawCoords, title: 'Warszawa' })
    const gdansk = await locationFactory.create({ ...gdanskCoords, title: 'Gdansk' })

    await institutionFactory.associations({ location: katowice }).create({ city: 'Katowice' })
    await institutionFactory.associations({ location: gliwice }).create({ city: 'Gliwice' })
    await institutionFactory.create({ city: 'Gliwice', validated: false })
    await institutionFactory.associations({ location: knurow }).create({ city: 'Knurow' })
    await institutionFactory.associations({ location: warsaw }).create({ city: 'Warszawa' })
    await institutionFactory.associations({ location: gdansk }).create({ city: 'Gdanskj' })
  })

  it('should return institutions within given radius, based on provided location, sorted by distance from closest to furthest', async () => {
    const institutions = await getAllInstitutionsWithinRadius({
      currentLng: Number(knurowCoords.lng),
      currentLat: Number(knurowCoords.lat),
      radius: 90_000,
    })

    const areAllInstitutionsValidated = institutions.every((i) => i.validated)

    institutions.map((i) => expect(i).not.toMatchObject({ city: 'Warszawa' }))
    institutions.map((i) => expect(i).not.toMatchObject({ city: 'Gdansk' }))

    expect(institutions[0]).toMatchObject({ city: 'Knurow' })
    expect(institutions[1]).toMatchObject({ city: 'Gliwice' })
    expect(institutions[2]).toMatchObject({ city: 'Katowice' })

    expect(areAllInstitutionsValidated).toEqual(true)
  })
})

describe('distinctInstitutionsCities/1', () => {
  beforeEach(async () => {
    const katowice = await locationFactory.create({ ...katowiceCoords, title: 'Katowice' })
    const gliwice = await locationFactory.create({ ...gliwiceCoords, title: 'Gliwice' })
    const warsaw = await locationFactory.create({ ...warsawCoords, title: 'Warszawa' })
    const gdansk = await locationFactory.create({ ...gdanskCoords, title: 'Gdansk' })

    await institutionFactory
      .associations({ location: katowice })
      .create({ city: 'Katowice', validated: false })
    await institutionFactory
      .associations({ location: gliwice })
      .create({ city: 'Gliwice', voivodeship: 'silesian' })
    await institutionFactory.create({ city: 'Bytom', voivodeship: 'silesian' })
    await institutionFactory.create({ city: 'Bytom', voivodeship: 'silesian' })
    await institutionFactory
      .associations({ location: warsaw })
      .create({ city: 'Warszawa', voivodeship: 'masovian' })
    await institutionFactory.create({ city: 'Warszawa' })
    await institutionFactory
      .associations({ location: gdansk })
      .create({ city: 'Gdansk', voivodeship: 'pomeranian' })
  })

  it('should return all possible distinct cities, ordered alphabetically, when no voivodeship provided', async () => {
    const cities = await distinctInstitutionsCities({ voivodeship: '*' })

    expect(cities).toEqual(['Bytom', 'Gdansk', 'Gliwice', 'Warszawa'])
  })

  it('should return distinct cities for a provided voivodeship', async () => {
    const expected: Partial<Record<Voivodehip, string[]>> = {
      silesian: ['Bytom', 'Gliwice'],
      masovian: ['Warszawa'],
      pomeranian: ['Gdansk'],
    }

    ;(['silesian', 'masovian', 'pomeranian'] as Voivodehip[]).forEach(async (v) => {
      const cities = await distinctInstitutionsCities({ voivodeship: v })
      expect(cities).toEqual(expected[v])
    })
  })
})
