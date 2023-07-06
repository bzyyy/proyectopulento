"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _Games = require("./games/Games");
var _player = require("./player/player");
var _team = require("./team/team");
var _user = require("./user/user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//import getHealth from './health/health'

const router = new _koaRouter.default();

//router.get('/health', getHealth)

//Games
router.get('/api/games', _Games.getGamesAllRouter);
router.get('/api/recentgames', _Games.getMostRecentGamesRouter);
router.get('/api/games/:nameTeam', _Games.getTeamsGamesRouter);

//Player
router.get('/api/:player/stats/:numbergames', _player.getPlayerStatsByGamesRouter);
router.get('/api/players/:name', _player.getPlayerByNameRouter);

//Team
router.get('/api/:team/players', _team.getTeamsPlayersRouter);

//User
router.get('/api/users', _user.getAllUsersRouter);
var _default = router;
exports.default = _default;