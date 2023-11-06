import express from 'express'
import handlebars from 'express-handlebars'

import usersRouter from './routes/users.routes.js'
import petsRouter from './routes/pets.routes.js'
import viewsRouter from './routes/views.routes.js'
import { __dirname } from './utils.js'

const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuración para uso de motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

/* app.use((req, res, next) => {
    console.log(`Ahora: ${new Date().toLocaleString()}`)
    next()
}) */

// Paquete de endpoints para manejo de plantillas
app.use('/', viewsRouter)
// Paquete de endpoints para manejo de usuarios
app.use('/api/users', usersRouter)
// Paquete de endpoints para manejo de mascotas
app.use('/api/pets', petsRouter)

// Servicio de contenidos estáticos
app.use('/static', express.static(`${__dirname}/public`))

app.listen(PORT, () => {
    console.log(`Servidor Express activo en puerto ${PORT}`)
})