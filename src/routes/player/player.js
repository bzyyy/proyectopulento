import {getPlayerByName, getPlayerStatsByGames, getTest} from "../../actions/player/player"

export async function getPlayerByNameRouter(ctx){
    ctx.body = await getPlayerByName(ctx.body)
    return ctx
}

export async function getPlayerStatsByGamesRouter(ctx){
    if(ctx.params.player === undefined){
        ctx.status = 400
        ctx.body = {message: 'Value undefined, try again.'}
        return ctx
    }
    let stats = await getPlayerStatsByGames(ctx.params.player)
    //let stats = await  getTest(ctx.params.player)
    ctx.body = stats
    return ctx
}