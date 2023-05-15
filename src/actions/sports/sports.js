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


async function getSportsAxios() {
        const sports = await axios.get('https://api.the-odds-api.com/v4/sports', {
            params: {
                apiKey,
                regions,
                markets,
                oddsFormat,
                dateFormat,
            }
        })
        return(sports.data)
}

async function getTeamsScoresAxios() {
    const teamScores = await axios.get('https://api.the-odds-api.com/v4/sports/basketball_nba/scores?apiKey=465789ee51e68d5445869e397a411d62&daysFrom=3')
    return(teamScores.data)
}



export async function getSportsAll(){
    let sports = await getSportsAxios()
    let sports_filtered =  sports.filter((sport)=> {
        return sport.key == 'basketball_nba'
    })
    return sports_filtered
}

export async function getTeamScores(team){
    let team_games =  await getTeamsScoresAxios()
    //if (team_games == []){
    //    return -1
    //}
    //let team_games_filtered  = team_games.filter((teams)=> {
    //    return teams.home_team == team || teams.away_team == team
    //})
    return team_games
}