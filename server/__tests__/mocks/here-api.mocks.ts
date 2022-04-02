import { rest } from 'msw'
import { HereCity, HereResponse } from '../../src/services/here-api.service'
import { HERE_API_AUTOCOMPLETE_BASE_URL } from '../../src/constants/here-api.constants'
import { hereCityFactory } from '../factories/here-api.factory'

export const hereApiMocks = [
  rest.get(HERE_API_AUTOCOMPLETE_BASE_URL, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit') || 5

    const searchString = req.url.searchParams.get('q')

    if (!searchString?.length) {
      return res(ctx.status(200), ctx.json<HereResponse<HereCity>>({ items: [] }))
    }

    const items: HereCity[] = hereCityFactory.buildList(Number(limit))

    return res(ctx.status(200), ctx.json<HereResponse<HereCity>>({ items }))
  }),
]
