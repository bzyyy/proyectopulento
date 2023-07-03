import {getPlayerByName, getPlayerRecentStats, getPlayerStatsByGames, getPlayerStatsAvgBySeason} from "../../actions/player/player"

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

export async function getPlayerRecentStatsRouter(ctx){
    console.log(ctx.params)
    if(ctx.params.player === undefined || ctx.params.player === ':player'){
        ctx.status = 400
        ctx.body = {message: 'Value for player undefined, try again.'}
        return ctx
    }
    if(ctx.query.numPage === undefined || ctx.query.numPage === ':numPage' ){
        let stats = await getPlayerRecentStats(ctx.params.player)
        ctx.body = stats
        return ctx
    }   
    else{
        let stats = await getPlayerRecentStats(ctx.params.player, ctx.query.numPage)
        ctx.body = stats
        return ctx
    }
}

export async function getPlayerStatsByGamesRouter_notused(ctx){
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

export async function getPlayerStatsAvgBySeasonRouter(ctx){
    //console.log(ctx.params.player)
    //console.log(ctx.query.season)

    if(ctx.params.player === undefined || ctx.params.player === ':player'){
        ctx.status = 400
        ctx.body = {message: 'Value for player undefined, try again.'}
        return ctx
    }
    if(ctx.request.query.season === undefined || ctx.request.query.season === ':season' ){
        ctx.stats = 400
        ctx.body = {message: 'Value for season undefined, try again.'}
        return ctx
    }   
    else{
        let stats_average = await getPlayerStatsAvgBySeason(ctx.params.player, ctx.query.season)
        ctx.body = stats_average
        return ctx
    }
}