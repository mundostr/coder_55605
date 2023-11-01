import express from 'express'
// A partir de ahora, utilizaremos el módulo Router de express para manejar los endpoints
// Colocaremos los paquetes de rutas de cada sección del proyecto en archivos separados
import usersRouter from './routes/users.routes.js'
import petsRouter from './routes/pets.routes.js'
import { __dirname } from './utils.js'

const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Un middleware es esencialmente una función que Express nos permite "inyectar"
// en la cadeja de ejecución de procesos que realiza.
// En este caso lo hacemos a nivel de APLICACION, utilizando el método use().
// Quiere decir que este middleware se ejecutará con cualquier solicitud recibida,
// sin importar el endpoint solicitado
/* app.use((req, res, next) => {
    console.log(Date.now())
    next()
}) */

// Con el mismo método use(), inyectamos los paquetes de rutas que hemos definido
// en archivos separados. Podemos ver como el app.js queda mucho más compacto
app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)

// Por último, activamo también el uso de express.static, que nos permite servir
// contenidos estáticos (imágenes, archivos html, js, css, etc) desde una carpeta
// indicada (public en este caso)
app.use('/static', express.static(`${__dirname}/public`))

app.listen(PORT, () => {
    console.log(`Servicio activo en puerto ${PORT}`)
})