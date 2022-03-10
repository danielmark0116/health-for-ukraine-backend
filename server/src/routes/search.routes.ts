import Express from 'express'
import { cacheMiddleware } from '../middlewares/cache.middleware'
import * as SearchController from '../controllers/search.controller'

const router = Express.Router()

router.get('/cities', cacheMiddleware, SearchController.searchCities)
router.get('/lookup', cacheMiddleware, SearchController.lookupPlaceById)

export default router
