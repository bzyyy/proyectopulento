import Router from 'koa-router'
//import getHealth from './health/health'
import { getGamesAllRouter,  getTeamsGamesRouter, getMostRecentGamesRouter } from './games/games'
import {getPlayerByNameRouter, getPlayerRecentStatsRouter, getPlayerStatsByGamesRouter} from './player/player'
import { getTeamsPlayersRouter } from './team/team'
import { getAllUsersRouter, createUserRouter, logInUserRouter,getFavPlayersRouter, addFavPlayerRouter } from './user/user'
const router = new Router()

//router.get('/health', getHealth)


//Games
router.get('/api/games', getGamesAllRouter)

router.get('/api/games/recent', getMostRecentGamesRouter)

router.get('/api/games/:nameTeam', getTeamsGamesRouter)


//Player
router.get('/api/players/:player/stats/:numbergames', getPlayerRecentStatsRouter)

router.get('/api/players/:name', getPlayerByNameRouter)

//Team
router.get('/api/:team/players', getTeamsPlayersRouter)

//User
router.get('/api/users', getAllUsersRouter)
router.put('/api/user', createUserRouter)
router.post('/api/user/login', logInUserRouter)
router.post('/api/user/favorites', getFavPlayersRouter)
router.post('/api/user/addFavPlayer', addFavPlayerRouter)


export default router
