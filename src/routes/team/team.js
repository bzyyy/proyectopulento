import {getTeamPlayers} from "../../actions/team/team"

export async function getTeamsPlayersRouter(ctx){
    if(ctx.params.team === undefined){
        ctx.status = 400
        ctx.body = {message: 'Bad request'}
        return ctx
    }
    let answer = await getTeamPlayers(ctx.params.team)
    if (answer == -1){
        ctx.status = 404
        ctx.body = {message : 'No hay registro de este equipo.'}
    }else{
        ctx.status = 200
        ctx.body = answer
    }
    return ctx
}
