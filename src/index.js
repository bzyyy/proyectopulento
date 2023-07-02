
import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'
import mongoose from 'mongoose'

const cors = require('@koa/cors');

const app = new koa()

mongoose.connect('mongodb://localhost:27017/bd_proyecto', { // mongodb://mongo:27017/bd_proyecto
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.use(cors())

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

//Servidor
app.listen(3000, function(){
    console.log('Servidor escuchando 3000')
})