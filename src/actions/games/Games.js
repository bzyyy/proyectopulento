import { defaultMaxListeners } from 'koa'

const axios = require('axios')

// An api key is emailed to you when you sign up to a plan
// Get a free API key at https://api.the-odds-api.com/
const apiKey = '465789ee51e68d5445869e397a411d62'
const sportKey = 'basketball_nba' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports
const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited
const markets = 'h2h' // h2h | spreads | totals. Multiple can be specified if comma delimited
const oddsFormat = 'decimal' // decimal | american
const dateFormat = 'iso' // iso | unix
const daysFrom = 3
/*
    First get a list of in-season sports
        the sport 'key' from the response can be used to get odds in the next request

*/


async function getGamesAxios() {
        const games = await axios.get('https://balldontlie.io/api/v1/games')
        return (games.data.data)
}

async function getTeamsGamesAxios() {
    const teamScores = await axios.get('')
    return(teamScores.data)
}



export async function getGamesAll(){
    let games = await getGamesAxios()

    return games
}

export async function getTeamsGames(team){
    let team_games =  await getGamesAxios()

    let result = team_games.filter((game) =>{
        return ( game.home_team.full_name == team || game.visitor_team.full_name == team )
    })

    if (result.length == 0){
        return -1
    }
    return result
}