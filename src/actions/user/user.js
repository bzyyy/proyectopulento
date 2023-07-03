import User from "../../model/UserModel"
import { getPlayerByName } from "../player/player"

const axios = require('axios')

//Placehodler para probar interactuar con lista de jugadores favoritos guardados con IDs de api balldontlie
const placeholders_user_1 = {
    'id' : '01',
    'name' : 'causa',
    'password' : 'tasecoctm',
    'favoritePlayers': [237]
}

//Placeholder para probar interactuar con favoritos pero guardados por su first y last name.
const placeholders_user_2 = {
    'id' : '02',
    'name' : 'manolo',
    'password' : 'tuki',
    'favoritePlayers': ['Lebron James', 'Nikola Jokic', 'Jayson Tatum']
}


const placeholder_all_users = [placeholders_user_1, placeholders_user_2]


//Encontrar como poder hacer los request necesarios para poder ver info de usuarios
//Crear usuarios, agregar y sacar jugadores favoritos de su lista de favoritos
//Para una BD de mongo no relacional???



export async function getUsers(){
    return await User.find()
}

export async function logIn(logInInfo){
    let answer = await User.find({correo: logInInfo.correo, password: logInInfo.password})
    if (answer.length ==0){
        return -1
    }
    console.log(answer)
    answer = {token: answer[0]._id, name: answer[0].name}
    console.log(answer)
    return answer
}

export async function addUser(userData){
    const user = {
        name: userData.name,
        correo: userData.correo,
        password: userData.password 
    }
    await User.create(user)
}

export async function eraseUser(userData){
    const user = await User.find({_id: userData._id})
    //console.log(user.length)
    if (user.length != 0){
        if(user[0].password == userData.password ){
            await User.deleteOne({_id: user[0]._id})
            return ({message: "User was deleted successfully !",
                    deletedUser: user})
        }
    }
    return -1 //In case no user was found.
}

//Favorites players

export async function findFavorites(userData){
    let answer = await User.find({_id: userData.token})
    answer = answer[0].favoritePlayers
    return answer
}

export async function addFavPlayer(input){
    const player = {name: input.playerName}
    const player_exists = await getPlayerByName(player.name)
    console.log(player_exists)
    if(player_exists != -1){
        const user = await User.findOne({_id: input.token  })
        //console.log(user)
        //if( user.favoritePlayers.length == 1){
        //    index = user.favoritePlayers.indexOf("none")
        //    user.favoritePlayers.splice(index)
        //}
        //console.log(player_exists.data[0].first_name)
        //console.log(player_exists.data[0].last_name)
        let firstname = player_exists.data[0].first_name
        let lastname = player_exists.data[0].last_name
        user.favoritePlayers.push(firstname+' '+lastname)
        await user.save()
        return 1 //Succesful 
    }
    return -1
}

export async function delFavPlayer(input){
    const player = {name: input.favplayer}
    const user = await User.findOne({_id: input.token})

    if (user.favoritePlayers.length != 0){
            let index = user.favoritePlayers.indexOf(player.name)
            if( index != -1){
                user.favoritePlayers.splice(index, 1) //Makes sure to only remove desired player from list
                await user.save()
                return ({message: "Player was removed from favorites...",
                        deletedPlayer: player})
            }
    }

    return -1 //No players in favorites at all
}

