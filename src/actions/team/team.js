import { defaultMaxListeners } from 'koa'
import { addSyntheticLeadingComment } from 'typescript'

const axios = require('axios')

//Axios Requests to outside API

async function getAllTeamsNBA(){
    const teams = await axios.get('https://balldontlie.io/api/v1/teams?' ,{
        params:{
            per_page : 100
        }
    })
    return (teams.data)
}

//Get de todos los jugadores, para luego filtrarlos por el equipo que se busca.
async function getAllPlayers(){
    const players = await axios.get('https://balldontlie.io/api/v1/players?per_page=100',{
        params:{
            seasons : '2023'
        }
    })
    return (players.data)
}

async function getAllPlayersByPage(num_page){
    const players = await axios.get('https://balldontlie.io/api/v1/players?per_page=100',{
        params:{
            page : num_page
        }
    })
    return (players.data)
}


//Request for our API

//Get para obtener team y todos sus jugadores.
export async function getTeamPlayers(name_team){
    let teams = await getAllTeamsNBA()
    let team = teams.data.filter((team) =>{
        return (team.full_name == name_team)
    })
    //console.log(teams)
    console.log(team)
    if (team.length == 0){
        return -1 //Retorna -1 para indicar que no se encontro juegos para el equipo deseado.
    }
    let players_team = []
    players_team.push(team)
    let all_players = await getAllPlayers()
    for (let i = 0; i < all_players.meta.total_pages; i++) {
        let all_players_loop = await getAllPlayersByPage(i+1)
        let players_in_team = all_players_loop.data.filter((player) =>{
            return (player.team.full_name == name_team)
        })
        players_team.push(players_in_team)
      }
    
    return players_team


}