import { addFavPlayer, delFavPlayer } from "../../actions/user/user"; 
import { getUsers, addUser, logIn,findFavorites, eraseUser } from '../../actions/user/user'


export async function getAllUsersRouter(ctx){
    ctx.body = await getUsers() 
    return ctx
}

export async function createUserRouter(ctx){
    await addUser(ctx.request.body)
    ctx.body = { message: 'User was created' }
    return ctx
}

export async function eraseUserRouter(ctx){
    //console.log(ctx.request.query)
    ctx.body = await eraseUser(ctx.request.query)
    if(ctx.body == -1){
        ctx.body = {message: "No user to be deleted found"}
        ctx.status = 404
    }
    return ctx
}

export async function logInUserRouter(ctx){
    console.log(ctx.request.body)
    ctx.body = await logIn(ctx.request.body)
    if(ctx.body == -1){
        ctx.body = {message:"Wrong username/password"}
        ctx.status = 404
    }
    return ctx
}

//Favorites Players

export async function getFavPlayersRouter(ctx){
    ctx.body = await findFavorites(ctx.request.body)
    if(ctx.body == 0){
        ctx.body = {message:"No favorite players yet!"}
        ctx.status = 200
    }
    return ctx
}

export async function addFavPlayerRouter(ctx){
    ctx.body = await addFavPlayer(ctx.request.body)
    if(ctx.body == 1){
        ctx.body = {message: "Favorite Player was added successfully!"}
        ctx.status = 200
    }
    return ctx
}

export async function delFavPlayerRouter(ctx){
    ctx.body = await delFavPlayer(ctx.request.query)
    if(ctx.body == 1){
        ctx.body = {message: "No players were found in favorite list"}
        ctx.status = 404
    }
    return ctx
}