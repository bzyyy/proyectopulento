import User from "../../model/UserModel"

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

export async function findFavorites(userData){
    let answer = await User.find({_id: userData.token})
    answer = answer[0].favoritePlayers
    return answer
}

export async function addFavPlayer(input){
    const player = {name: input.playerName}
    const user = await User.findOne({_id: input.token})
    //console.log(user)
    user.favoritePlayers.push(player.name)
    await user.save()
    return 1 //Succesful
}

