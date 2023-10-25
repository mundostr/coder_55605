/**
 * Este es nuestro primer servidor con Express!
 * 
 * Express es un framework que nos va a acompañar a lo largo de todo el curso, facilitándonos
 * el desarrollo de un servicio tipo API REST, capaz de entregar gran variedad de datos en
 * formato JSON
 */

import express from 'express'

// Creamos constantes para organizarnos, un pequeño array de usuarios para prueba
const PORT = 8080
const users = [
    { firstName: 'Carlos', lastName: 'Perren', age: 48, mail: 'cperren@gmail.com' },
    { firstName: 'Juan', lastName: 'Perez', age: 30, mail: 'jperez@gmail.com' },
    { firstName: 'Carolina', lastName: 'Perez', age: 28, mail: 'cperez@gmail.com' }
]

// Inicializamos nuestro servidor de express
// El agregado de urlencoded nos permitirá más adelante procesar mejor las solicitudes recibidas
const app = express()
app.use(express.urlencoded({ extended: true }))

// El servidor puede atender distintos tipos de solicitudes (GET, POST, PUT, DELETE, etc)
// En este primer ejemplo solo utilizaremos GET

// Esto es un ENDPOINT, una ruta hacia un contenido específico en el servidor
// En este caso, si ejecutamos el script en nuestra máquina local y visitamos
// http://localhost:8080/hello, recibiremos en el navegador la respuesta Hola desde Express!
// en TEXTO PLANO
app.get('/hello', (req, res) => {
    res.send('Hola desde Express!')
})

// A este segundo endpoint accedemos desde http://localhost:8080/welcome y retorna un mensaje
// en HTML
app.get('/welcome', (req, res) => {
    res.send('<h1 style="color: blue;">Bienvenida en azul!</h1>')
})

// A este tercer endpoint accedemos desde http://localhost:8080/users y retorna un mensaje
// conteniendo un OBJETO
app.get('/users', (req, res) => {
    res.send(users)
})

// Este endpoint recibe un PARAMETRO utilizando la opción req.params
// Express "inyecta" en el objeto req.params la/s variable/s que indiquemos en la ruta,
// SIEMPRE debemos indicarlas antecediendo dos puntos (:)
// Accedemos al endpoint desde http://localhost:8080/userparams/2, el parámetro 2
// estará disponible en el callback como req.params.uid (o el nombre que hayamos elegido)
app.get('/userparams/:uid', (req, res) => {
    res.send(users[req.params.uid])
})

// Este endpoint recibe un PARAMETRO utilizando la opción req.query
// Express "inyecta" en el objeto req.query la/s variable/s que indiquemos en la ruta,
// SIEMPRE debemos indicarlas utilizando el signo de pregunta (?) para marcar el inicio
// de variables y la Y comercial (&) para separar una variable de otra.
// Accedemos al endpoint desde http://localhost:8080/userquery?uid=2, el parámetro 2
// estará disponible en el callback como req.query.uid (o el nombre que hayamos colocado en la url)
app.get('/userquery', (req, res) => {
    res.send(users[req.query.uid])
})

// Ponemos a "escuchar" el servidor en el puerto
app.listen(PORT, () => {
    console.log(`Servidor express activo en puerto ${PORT}`)
})