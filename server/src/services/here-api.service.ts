import axios from 'axios'
import { locationLookUpCacheKey } from '../constants/redis.constants'
import {
  HERE_API_AUTOCOMPLETE_BASE_URL,
  HERE_API_LOOKUP_BASE_URL,
} from '../constants/here-api.constants'
import { cacheResponseData, getCachedResponseData } from './cache.service'

export type HereResponse<ResponseType> = {
  items: ResponseType[]
}

export type HereAddress = {
  label: string
  countryCode: string
  countryName: string
  state: string
  county: string
  city: string
  postalCode: string
  district?: string
  houseNumber?: string
}

export type HereCity = {
  title: string
  id: string
  language: string
  resultType: 'locality' | 'administrativeArea'
  localityType?: string
  address: HereAddress
}

export type HereData = {
  title: string
  id: string
  language: string
  resultType: string
  localityType?: string
  address: HereAddress
  position: {
    lat: number
    lng: number
  }
}

export const composeCitiesAutocompleteUrl = () => {
  const url = new URL(HERE_API_AUTOCOMPLETE_BASE_URL)
  // https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
  // url.searchParams.set('types', 'city') // -> without, smaller villages are easier to find. But duplicates because of different localitytypes
  url.searchParams.set('apiKey', process.env.HERE_API_KEY)
  url.searchParams.set('types', 'area')
  url.searchParams.set('in', 'countryCode:POL')
  url.searchParams.set('lang', 'pl')
  url.searchParams.set('limit', '5')
  return url
}

const composeLookupUrl = () => {
  const url = new URL(HERE_API_LOOKUP_BASE_URL)
  return url
}

export const autocompleteCities = async (searchText: string): Promise<HereCity[]> => {
  try {
    const url = composeCitiesAutocompleteUrl()

    url.searchParams.set('q', searchText)

    const {
      data: { items: cities },
    } = await axios.get<HereResponse<HereCity>>(url.toString())

    return cities.filter((c) => c.resultType !== 'administrativeArea')
  } catch (e) {
    throw e
  }
}

export const lookupPlaceById = async (id: string): Promise<HereData> => {
  try {
    const cacheKey = locationLookUpCacheKey(id)
    const cachedPlace = await getCachedResponseData<HereData>(cacheKey)

    if (cachedPlace) {
      return cachedPlace
    }

    const url = composeLookupUrl()

    url.searchParams.set('id', id)

    const { data } = await axios.get<HereData>(url.toString())

    cacheResponseData(cacheKey, data)

    return data
  } catch (e) {
    throw e
  }
}
