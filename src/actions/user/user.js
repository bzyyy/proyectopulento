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

export async function getAllUsers(){
    return placeholder_all_users
}