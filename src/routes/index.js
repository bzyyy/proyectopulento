import Router from 'koa-router'
//import getHealth from './health/health'
import { getSports, getTeamScoresLive } from './sports/sports'


const router = new Router()

//router.get('/health', getHealth)

router.get('/api/sports', getSports)

router.get('/api/team/:nameTeam', getTeamScoresLive)

export default router
