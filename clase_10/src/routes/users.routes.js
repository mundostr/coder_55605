import { Router } from 'express'

// A partir de ahora, para definir endpoints utilizaremos el objeto Router de express
const router = Router()

const users = []

// Un middleware es esencialmente una función que Express nos permite "inyectar"
// en la cadeja de ejecución de procesos que realiza.
// En este caso lo hacemos a nivel de ROUTER, es decir, para cualquier endpoint
// definido en este archivo de users, se ejecutará previamente este console log
/* router.use((req, res, next) => {
    console.log(Date.now())
    next()
}) */

// Middleware a nivel de endpoint
// Podemos declarar una función para utilizar como middleware
// Observar el uso de req, res y next como parámetros, Express se encargará de entregarlos
// next() es un método que permitirá al middleware seguir la "cadena" en caso que todo esté ok.
const report = (req, res, next) => {
    console.log(`Ahora: ${new Date().toLocaleString()}`)
    next()
}

// En este endpoint vemos como podemos "inyectar" el eslabón del middleware para que se ejecute
// antes que se procese el callback del endpoint
router.get('/', report, (req, res) => {
    res.status(200).send({ data: users })
})

router.post('/', (req, res) => {
    // Deberíamos controlar lo que llega en el req.body

    // Si queremos utilizar socket.io en este endpoint, nos
    // traemos la referencia de socketServer generada en la app
    const socketServer = req.app.get('socketServer')
    socketServer.emit('new_product', 'Quiere cargar un nuevo producto')

    const newContent = req.body
    users.push(newContent)
    res.status(200).send({ data: newContent })
})

export default router