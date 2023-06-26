import { getAllUsers } from "../../actions/user/user"; 

export async function getAllUsersRouter(ctx){
    let users = await getAllUsers()
    ctx.body = users
    return ctx
}