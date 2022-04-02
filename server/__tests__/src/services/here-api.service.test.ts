import {
  autocompleteCities,
  composeCitiesAutocompleteUrl,
} from '../../../src/services/here-api.service'

describe('composeCitiesAutocompleteUrl/0', () => {
  it('should return url with proper url params', () => {
    const url = composeCitiesAutocompleteUrl().toString()

    const decodedUrl = decodeURIComponent(url)

    expect(decodedUrl).toMatch(/types=area/)
    expect(decodedUrl).toMatch(/in=countryCode:POL/)
    expect(decodedUrl).toMatch(/lang=pl/)
    expect(decodedUrl).toMatch(/limit=5/)
  })
})

describe('autocompleteCities/1', () => {
  it('should return some results (exluding these of type `administrativeArea`) when search string provided', async () => {
    const results = await autocompleteCities('krakow')

    expect(results.length).toBeTruthy()
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ resultType: expect.not.stringMatching('administrativeArea') }),
      ])
    )
  })

  it('should return nothing when no `q` parameter provided', async () => {
    const results = await autocompleteCities('')

    expect(results.length).toEqual(0)
  })
})
