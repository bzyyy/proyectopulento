import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        index: {unique: true},
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favoritePlayers: {
        type: [String]
    }
})

export default model('User', userSchema)