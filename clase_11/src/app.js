import express from 'express'
import handlebars from 'express-handlebars'
// Importamos solo el servidor de socket.io
import { Server } from 'socket.io'

import { __dirname } from './utils.js'
import viewsRouter from './routes/views.routes.js'

const PORT = 5000

const app = express()
// Asignamos a httpServer la instancia de Express para poder luego pasarlo al server de socket.io
const httpServer = app.listen(PORT, () => {
    console.log(`Servicio activo en puerto ${PORT}`)
})

let messages = []
// Creamos un servidor websockets con socket.io
const io = new Server(httpServer)
// Ponemos a "escuchar" conexiones al servidor websockets
io.on('connection', socket => {
    // Cuando un nuevo cliente se conecta, enviamos (SOLO a ese cliente)
    // el array actual de mensajes del chat
    socket.emit('messagesLogs', messages)
    console.log(`Chat actual enviado a ${socket.id}`)

    // Este es otro ejemplo que "escucha" el tópico user_connected generado
    // desde el cliente de chat cuando ha ingresado un nombre de usuario válido
    socket.on('user_connected', data => {
        // Retransmitimos los datos de usuario a TODOS los clientes conectados, excepto
        // el que se acaba de conectar
        socket.broadcast.emit('user_connected', data)
    })

    // "Escuchamos" por el tópico message
    socket.on('message', data => {
        // Cuando se recibe cualquier mensaje desde cualquier cliente, reenviamos el array
        // de mensajes a TODOS, incluyendo el que acaba de generar el mensaje.
        // Atención!: esta es solo una muestra, en producción enviaríamos solo el nuevo
        // mensaje y NO todo el array.
        messages.push(data)
        io.emit('messagesLogs', messages)
    })
})

// De aquí en más, lo habitual con lo que ya veníamos trabajando
// Solo tenemos un paquete de rutas (viewsRouter) para poder usar el ejemplo del chat
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

app.use('/static', express.static(`${__dirname}/public`))