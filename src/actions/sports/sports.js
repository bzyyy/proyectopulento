const axios = require('axios')

// An api key is emailed to you when you sign up to a plan
// Get a free API key at https://api.the-odds-api.com/
const apiKey = '465789ee51e68d5445869e397a411d62'
const sportKey = 'basketball_nba' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports
const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited
const markets = 'h2h' // h2h | spreads | totals. Multiple can be specified if comma delimited
const oddsFormat = 'decimal' // decimal | american
const dateFormat = 'iso' // iso | unix
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

export default function getSportsAll(){
    const sports = getSportsAxios();
    return sports 
}