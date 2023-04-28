import Router from 'koa-router'
//import getHealth from './health/health'
import getSports from './sports/sports'

const router = new Router()

//router.get('/health', getHealth)

router.get('/api/sports', getSports)

export default router
