export const REDIS_CACHE_EXPIRY_TIMESPAN_SECONDS = 60 * 60 * 24 * 30
export const locationLookUpCacheKey = (id: string) => `lookup_place:${id}`
