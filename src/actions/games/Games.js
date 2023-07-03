import { defaultMaxListeners } from 'koa'

const axios = require('axios')

//Axios Requests to outside API
async function getGamesAxios() {
        const games = await axios.get('https://balldontlie.io/api/v1/games?',{
            params : {
                per_page : 12, //Si se cambia este numero, asegurarse de cambiar el de getGamesByPage, si no error, y viceversa.
            }
        })
        return (games.data)
}

async function getGamesByPage(num_page){
    const games = await axios.get('https://balldontlie.io/api/v1/games?',{
            params : {
                per_page : 12,
                page : num_page
            }
        })
        return games.data
}
async function getTeamsGamesAxios() {
    const teamScores = await axios.get('')
    return(teamScores.data)
}

//Request for our API
//Funcion para obtener la data de get games del API externo.
export async function getGamesAll(){
    let games = await getGamesAxios()
    return games
}

export async function getMostRecentGames(num_page = 1){
    let games = await getGamesAxios()
    //
    if (num_page == 1){
        //Se asegura de acceder a la ultima pagina de la data para poder acceder a los juegos mas recientes.
        if(games.meta.next_page != null){
            games = await getGamesByPage(games.meta.total_pages)
        }
    }
    else{
        if(games.meta.next_page != null){
            games = await getGamesByPage(games.meta.total_pages - (num_page -1))
        }
    } //Una vez en la pagina se asegura de que los juegos este ordenados de los mas recientes a los mas viejos.
    let newest_games = games.data.sort((a,b) =>{
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    return {data :newest_games, meta: games.meta}
}

//Funcion para obtener los juegos de un equipo en particular, vienen los mas recientes primero por default.
export async function getTeamsGames(team){
    let team_games =  await getGamesAxios()

    let result = team_games.data.filter((game) =>{
        //Se asegura de filtrar el request de la api externa para poder solo retornar el equipo deseado
        //Esto lo hace basado en cuanto si encuentra como home o visitor team para un juego.
        return ( game.home_team.full_name == team || game.visitor_team.full_name == team )
    })

    if (result.length == 0){
        return -1 //Retorna -1 para indicar que no se encontro juegos para el equipo deseado.
    }
    return result
}