import { Factory } from 'fishery'
import { HereCity } from '../../src/services/here-api.service'
import _ from 'lodash'

export const hereCityFactory = Factory.define<HereCity, Partial<HereCity>>(
  ({ sequence, params }) => {
    const randomNumber = _.random(0, 10)

    return {
      id: String(sequence),
      title: `City ${sequence}`,
      address: {
        city: `City ${sequence}`,
        label: `Label ${sequence}`,
        state: 'Some state',
        county: 'Some county',
        postalCode: '12-123',
        countryCode: 'pl',
        countryName: 'Poland',
      },
      language: 'pl',
      resultType: randomNumber % 2 === 0 ? 'administrativeArea' : 'locality',
      localityType: 'locality',
      ...(params as Partial<HereCity>),
    }
  }
)
