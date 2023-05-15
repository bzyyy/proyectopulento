import {getSportsAll, getTeamScores} from "../../actions/sports/sports"


//testing: obteniendo todos los nombres
export async function getSports(ctx) {
    ctx.body = await getSportsAll()
    return ctx
}

export async function getTeamScoresLive(ctx){
    if(ctx.params.nameTeam === undefined){
        ctx.status = 400
        ctx.body = {message: 'Bad request'}
        return ctx
    }
    answer = await getTeamScores(ctx.params.nameTeam)
    if (answer == -1){
        ctx.status = 404
        ctx.body = {message : 'Equipo no existe'}
    }else{
        ctx.status = 200
        ctx.body = answer
    }
    return ctx
}