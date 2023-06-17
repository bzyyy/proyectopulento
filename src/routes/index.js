import Router from 'koa-router'
//import getHealth from './health/health'
import { getGamesAllRouter,  getTeamsGamesRouter, getMostRecentGamesRouter } from './games/Games'


const router = new Router()

//router.get('/health', getHealth)

router.get('/api/games', getGamesAllRouter)

router.get('/api/recentgames', getMostRecentGamesRouter)

router.get('/api/games/:nameTeam', getTeamsGamesRouter)

export default router
