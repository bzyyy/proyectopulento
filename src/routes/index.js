import Router from 'koa-router'
//import getHealth from './health/health'
import { getGamesAllRouter,  getTeamsGamesRouter, getMostRecentGamesRouter } from './games/games'
import {getPlayerByNameRouter, getPlayerStatsByGamesRouter} from './player/player'
import { getTeamsPlayersRouter } from './team/team'
import { getAllUsersRouter } from './user/user'

const router = new Router()

//router.get('/health', getHealth)


//Games
router.get('/api/games', getGamesAllRouter)

router.get('/api/recentgames', getMostRecentGamesRouter)

router.get('/api/games/:nameTeam', getTeamsGamesRouter)


//Player
router.get('/api/:player/stats/:numbergames', getPlayerStatsByGamesRouter)

router.get('/api/players/:name', getPlayerByNameRouter)

//Team
router.get('/api/:team/players', getTeamsPlayersRouter)

//User
router.get('/api/users', getAllUsersRouter)

export default router
