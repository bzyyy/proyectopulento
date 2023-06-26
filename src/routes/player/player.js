import {getPlayerByName, getPlayerStatsByGames, getTest} from "../../actions/player/player"

export async function getPlayerByNameRouter(ctx){
    console.log(ctx.params)
    if(ctx.params.name == undefined){
        ctx.status = 400
        ctx.body = {message: 'Player undefined, try again.'}
        return ctx
    }
    ctx.body = await getPlayerByName(ctx.params.name)
    if(ctx.body == -1){
        ctx.status = 400
        ctx.body = {message: 'Player not found, try again.'}
        return ctx
    }
    return ctx
}

export async function getPlayerStatsByGamesRouter(ctx){
    console.log(ctx.params)
    console.log(ctx.params.player)
    console.log(ctx.params.numbergames)
    if(ctx.params.player === undefined || ctx.params.player === ':player'){
        ctx.status = 400
        ctx.body = {message: 'Value for player undefined, try again.'}
        return ctx
    }
    if(ctx.params.numbergames === undefined || ctx.params.numbergames === ':numbergames' ){
        let stats = await getPlayerStatsByGames(ctx.params.player)
        ctx.body = stats
        return ctx
    }   
    else{

        let stats = await getPlayerStatsByGames(ctx.params.player, ctx.params.numbergames)
        ctx.body = stats
        return ctx
    }
}