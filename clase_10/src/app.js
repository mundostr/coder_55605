import express from 'express'
import handlebars from 'express-handlebars'
// Importamos solo el objeto Server desde socket.io
import { Server } from 'socket.io'

import usersRouter from './routes/users.routes.js'
import petsRouter from './routes/pets.routes.js'
import viewsRouter from './routes/views.routes.js'
import { __dirname } from './utils.js'

const PORT = 8080

const app = express()
// Modificamos la llamada al método listen() de Express, almacenándola en una instancia httpServer
const httpServer = app.listen(PORT, () => {
    console.log(`Servicio activo en puerto ${PORT}`)
})

// Creamos un nuevo servidor de Websockets
const socketServer = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false
    } 
})
// Ponemos a "escuchar" el servidor para eventos de conexión
socketServer.on('connection', socket => {
    console.log(socket.id)

    // Ahora lo ponemos a "escuchar" por mensajes específicos que vengan bajo el tópico "message"
    socket.on('message', data => {
        console.log(data)
        // Envía SOLO a el cliente específico que emitió el mensaje message
        // socket.emit('confirmation', 'Esta es la confirmación')

        // Envía a TODOS LOS CLIENTES MENOS el que envió el mensaje message
        // socket.broadcast.emit('confirmation', 'Esta es la confirmación')

        // Envía a TODOS LOS CLIENTES INCLUYENDO el que envió el mensaje message
        socketServer.emit('confirmation', 'Esta es la confirmación')
    })

    // "Escuchamos" por otros mensajes bajo el tópico "new_message", así podemos agregar todos
    // los tópicos que necesitemos para trabajar
    socket.on('new_message', data => {
        socketServer.emit('message_added', data)
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.set('socketServer', socketServer)

app.use('/', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)

app.use('/static', express.static(`${__dirname}/public`))