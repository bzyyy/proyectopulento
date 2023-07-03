import Router from 'koa-router'
//import getHealth from './health/health'
import { getGamesAllRouter,  getTeamsGamesRouter, getMostRecentGamesRouter } from './games/games'
import {getPlayerByNameRouter, getPlayerRecentStatsRouter, getPlayerStatsAvgBySeasonRouter} from './player/player'
import { getTeamsPlayersRouter } from './team/team'
import { getAllUsersRouter, createUserRouter, logInUserRouter,getFavPlayersRouter, addFavPlayerRouter, eraseUserRouter, delFavPlayerRouter } from './user/user'
const router = new Router()

//router.get('/health', getHealth)


//Games
router.get('/api/games', getGamesAllRouter)
router.get('/api/games/recent', getMostRecentGamesRouter)
router.get('/api/games/:nameTeam', getTeamsGamesRouter)


//Player
router.get('/api/players/:player/stats', getPlayerRecentStatsRouter)
router.get('/api/players/:player/stats/average', getPlayerStatsAvgBySeasonRouter)
router.get('/api/players/:name', getPlayerByNameRouter)

//Team
router.get('/api/:team/players', getTeamsPlayersRouter)

//User
router.get('/api/users', getAllUsersRouter)
router.put('/api/user', createUserRouter)
router.del('/api/user', eraseUserRouter)
router.post('/api/user/login', logInUserRouter)
//User.favorites
router.post('/api/user/favplayers', getFavPlayersRouter)
router.post('/api/user/favplayer', addFavPlayerRouter)
router.del('/api/user/favplayer', delFavPlayerRouter)

export default router
