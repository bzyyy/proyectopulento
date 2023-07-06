"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGamesAll = getGamesAll;
exports.getMostRecentGames = getMostRecentGames;
exports.getTeamsGames = getTeamsGames;
var _koa = require("koa");
const axios = require('axios');

//// An api key is emailed to you when you sign up to a plan
//// Get a free API key at https://api.the-odds-api.com/
//const apiKey = '465789ee51e68d5445869e397a411d62'
//const sportKey = 'basketball_nba' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports
//const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited
//const markets = 'h2h' // h2h | spreads | totals. Multiple can be specified if comma delimited
//const oddsFormat = 'decimal' // decimal | american
//const dateFormat = 'iso' // iso | unix
//const daysFrom = 3
///*
//    First get a list of in-season sports
//        the sport 'key' from the response can be used to get odds in the next request
//
//*/

//Axios Requests to outside API
async function getGamesAxios() {
  const games = await axios.get('https://balldontlie.io/api/v1/games?', {
    params: {
      per_page: 100
    }
  });
  return games.data;
}
async function getGamesByPage(num_page) {
  const games = await axios.get('https://balldontlie.io/api/v1/games?', {
    params: {
      per_page: 100,
      page: num_page
    }
  });
  return games.data;
}
async function getTeamsGamesAxios() {
  const teamScores = await axios.get('');
  return teamScores.data;
}

//Request for our API
//Funcion para obtener la data de get games del API externo.
async function getGamesAll() {
  let games = await getGamesAxios();
  return games;
}
async function getMostRecentGames() {
  let games = await getGamesAxios();
  //Se asegura de acceder a la ultima pagina de la data para poder acceder a los juegos mas recientes.
  if (games.meta.next_page != null) {
    games = await getGamesByPage(games.meta.total_pages);
  } //Una vez en la pagina se asegura de que los juegos este ordenados de los mas recientes a los mas viejos.
  let newest_games = games.data.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return newest_games;
}

//Funcion para obtener los juegos de un equipo en particular, vienen los mas recientes primero por default.
async function getTeamsGames(team) {
  let team_games = await getGamesAxios();
  let result = team_games.data.filter(game => {
    //Se asegura de filtrar el request de la api externa para poder solo retornar el equipo deseado
    //Esto lo hace basado en cuanto si encuentra como home o visitor team para un juego.
    return game.home_team.full_name == team || game.visitor_team.full_name == team;
  });
  if (result.length == 0) {
    return -1; //Retorna -1 para indicar que no se encontro juegos para el equipo deseado.
  }

  return result;
}