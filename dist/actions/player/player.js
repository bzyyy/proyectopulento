"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayerByName = getPlayerByName;
exports.getPlayerStatsByGames = getPlayerStatsByGames;
exports.getTest = getTest;
var _koa = require("koa");
var _typescript = require("typescript");
const axios = require('axios');

//Axios Requests to outside API
async function getPlayerByNameAxios(name) {
  const player = await axios.get('https://balldontlie.io/api/v1/players?', {
    params: {
      per_page: 100,
      search: name
    }
  });
  return player.data;
}
async function getPlayerRecentStats(id_player, number_games) {
  const stats = await axios.get('https://balldontlie.io/api/v1/stats?', {
    params: {
      per_page: number_games,
      player_ids: [id_player]
    }
  });
  return stats.data;
}
async function getPlayerRecentStatsByPage(id_player, number_games, number_page) {
  const stats = await axios.get('https://balldontlie.io/api/v1/stats?', {
    params: {
      per_page: number_games,
      page: number_page,
      player_ids: [id_player]
    }
  });
  return stats.data;
}

//Request for our api

async function getPlayerByName(name) {
  let players = await getPlayerByNameAxios(name);
  //Una vez en la pagina se asegura de que los juegos este ordenados de los mas recientes a los mas viejos.
  if (players.data.length == 0) {
    return -1; //Retorna -1 para indicar que no se encontro jguadores con el ese first o last name.
  }

  return players;
}

//Funcion la cual en base al nombre de un jugador, buscara las estadisticas suyas de los ultimos diez juegos en los que participo.
async function getPlayerStatsByGames(player, n_games = 10) {
  let player_temp = await getPlayerByName(player);
  //console.log(player_temp.data[0].id)
  //Por default se retornara las stats del primer jugador el que mejor calce el "nombre" entregado al request
  // mejor caso escenario, se entrega nombre y apellido, y no hay otro igual
  let stats = await getPlayerRecentStats(player_temp.data[0].id, n_games);
  if (stats.meta.next_page != null) {
    stats = await getPlayerRecentStatsByPage(player_temp.data[0].id, n_games, stats.meta.total_pages);
  } //Una vez en la pagina se asegura de que los juegos este ordenados de los mas recientes a los mas viejos.
  stats.data = stats.data.sort((a, b) => {
    return new Date(b.game.date).getTime() - new Date(a.game.date).getTime();
  });
  return stats;
}
async function getTest(player_name) {
  let players = await getPlayerByNameAxios(player_name);
  return players;
}