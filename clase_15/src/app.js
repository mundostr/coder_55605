import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'

import { __dirname } from './utils.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'

const PORT = 5000
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder55605'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)

app.use('/static', express.static(`${__dirname}/public`))

try {
    await mongoose.connect(MONGOOSE_URL)
    app.listen(PORT, () => {
        console.log(`Backend activo puerto ${PORT} conectado a bbdd`)
    })
} catch(err) {
    console.log(`No se puede conectar con bbdd (${err.message})`)
}