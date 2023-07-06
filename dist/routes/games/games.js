"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGamesAllRouter = getGamesAllRouter;
exports.getMostRecentGamesRouter = getMostRecentGamesRouter;
exports.getTeamsGamesRouter = getTeamsGamesRouter;
var _Games = require("../../actions/games/Games");
//testing: obteniendo todos los nombres
async function getGamesAllRouter(ctx) {
  ctx.body = await (0, _Games.getGamesAll)();
  return ctx;
}
async function getMostRecentGamesRouter(ctx) {
  ctx.body = await (0, _Games.getMostRecentGames)();
  return ctx;
}
async function getTeamsGamesRouter(ctx) {
  if (ctx.params.nameTeam === undefined) {
    ctx.status = 400;
    ctx.body = {
      message: 'Bad request'
    };
    return ctx;
  }
  let answer = await (0, _Games.getTeamsGames)(ctx.params.nameTeam);
  if (answer == -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No hay registro de este equipo.'
    };
  } else {
    ctx.status = 200;
    ctx.body = answer;
  }
  return ctx;
}