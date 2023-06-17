import {getGamesAll, getTeamsGames, getMostRecentGames} from "../../actions/games/Games"


//testing: obteniendo todos los nombres
export async function getGamesAllRouter(ctx) {
    ctx.body = await getGamesAll()
    return ctx
}

export async function getMostRecentGamesRouter(ctx){
    ctx.body = await getMostRecentGames()
    return ctx
}

export async function getTeamsGamesRouter(ctx){
    if(ctx.params.nameTeam === undefined){
        ctx.status = 400
        ctx.body = {message: 'Bad request'}
        return ctx
    }
    let answer = await getTeamsGames(ctx.params.nameTeam)
    if (answer == -1){
        ctx.status = 404
        ctx.body = {message : 'No hay registro de este equipo.'}
    }else{
        ctx.status = 200
        ctx.body = answer
    }
    return ctx
}