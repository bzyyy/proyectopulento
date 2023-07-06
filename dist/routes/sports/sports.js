"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSports = getSports;
exports.getTeamScoresLive = getTeamScoresLive;
var _sports = require("../../actions/sports/sports");
//testing: obteniendo todos los nombres
async function getSports(ctx) {
  ctx.body = await (0, _sports.getSportsAll)();
  return ctx;
}
async function getTeamScoresLive(ctx) {
  if (ctx.params.nameTeam === undefined) {
    ctx.status = 400;
    ctx.body = {
      message: 'Bad request'
    };
    return ctx;
  }
  answer = await (0, _sports.getTeamScores)(ctx.params.nameTeam);
  if (answer == -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'Equipo no existe'
    };
  } else {
    ctx.status = 200;
    ctx.body = answer;
  }
  return ctx;
}