import { agent } from '../../setup/request'
import { knurowCoords, katowiceCoords } from '../../mocks/mockLocations'
import { locationFactory } from '../../factories/location.factory'
import { institutionFactory } from '../../factories/institution.factory'
import { Institution } from '../../../src/entities/institution.entity'

const { lat, lng } = knurowCoords

describe('GET /api/institutions/withinRadius', () => {
  beforeEach(async () => {
    const katowice = await locationFactory.create({ ...katowiceCoords, title: 'Katowice' })
    const knurow = await locationFactory.create({ ...knurowCoords, title: 'Knurow' })
    const otherLocations = await locationFactory.createList(5)

    await institutionFactory.associations({ location: katowice }).create({ city: 'Katowice' })
    await institutionFactory.associations({ location: knurow }).create({ city: 'Knurow' })

    for (const location of otherLocations) {
      await institutionFactory.associations({ location }).create({ city: location.title })
    }
  })

  it('should return successful response with institutions within radius', async () => {
    const response = await agent.get(`/api/institutions/withinRadius?lat=${lat}&lng=${lng}`)

    response.body.institutions.map((i: Institution) => expect(i).toMatchObject({ validated: true }))
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({ success: true }))
    expect(response.body.institutions[0]).toEqual(expect.objectContaining({ city: 'Knurow' }))
  })

  it('should return an error response when no lat and lng provided', async () => {
    const response = await agent.get(`/api/institutions/withinRadius?lat=0&lng=incorredtValue`)

    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.objectContaining({ success: false, error: true }))
    expect(response.body).not.toEqual(expect.objectContaining({ institutions: [] }))
  })
})

describe('GET /api/institutions/cities', () => {
  beforeEach(async () => {
    const katowice = await locationFactory.create({ ...katowiceCoords, title: 'Katowice' })
    const knurow = await locationFactory.create({ ...knurowCoords, title: 'Knurow' })

    await institutionFactory
      .associations({ location: katowice })
      .create({ city: 'Katowice', voivodeship: 'silesian' })
    await institutionFactory
      .associations({ location: knurow })
      .create({ city: 'Knurow', voivodeship: 'silesian' })
  })

  it('should return en error when no voivodeship provided as url query param', async () => {
    const response = await agent.get('/api/institutions/cities')

    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.objectContaining({ success: false, error: true }))
  })

  it('should return an error when incorrect voivodeship value is provided as url query param', async () => {
    const response = await agent.get('/api/institutions/cities?voivodeship=randomValue')

    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.objectContaining({ success: false, error: true }))
  })

  it('should return a list of unique, distinct cities for a provided voivodeship', async () => {
    const response = await agent.get('/api/institutions/cities?voivodeship=silesian')

    const { cities } = response.body

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({ success: true, error: false }))
    expect(response.body).toHaveProperty('cities')
    expect(cities).toEqual(expect.arrayContaining(['Knurow', 'Katowice']))
  })
})
