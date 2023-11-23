import express from 'express'
// A partir de ahora, utilizaremos siempre Mongoose para interactuar con el motor MongoDB
import mongoose from 'mongoose'

import { __dirname } from './utils.js'
import studentsRouter from './routes/students.routes.js'

const PORT = 5000
// Conectaremos al motor local, base de datos coder_55605
// Por supuesto podríamos también hacerlo a una instancia remota
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder_55605'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/students', studentsRouter)
app.use('/static', express.static(`${__dirname}/public`))

try {
    // Aguardamos la conexión con el motor de base de datos y luego ponemos a escuchar el servidor
    await mongoose.connect(MONGOOSE_URL)
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`)
    })
} catch(err) {
    console.log(`No se puede conectar con el servidor de bbdd (${err.message})`)
}