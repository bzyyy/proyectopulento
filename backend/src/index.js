
import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'

const cors = require('@koa/cors');

const app = new koa()

app.use(cors())

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

//Servidor
app.listen(3000, function(){
    console.log('Servidor escuchando 3000')
})