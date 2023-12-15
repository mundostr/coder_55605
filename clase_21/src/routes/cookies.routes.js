import { Router } from 'express'

const router = Router()

// Generamos 3 rutas tipo GET, pero SOLO DE PRUEBA para ver los primeros conceptos de cookies.
// Normalmente generaremos o eliminaremos cookies desde otros endpoints, según necesitemos.
router.get('/getcookies', async (req, res) => {
    try {
        // Atención, recordar!!!:
        // Cookies NO firmadas -> las tendremos disponibles en req.cookies;
        // Cookies firmadas -> req.signedCookies
        // res.status(200).send({ status: 'OK', data: req.cookies })
        res.status(200).send({ status: 'OK', data: req.signedCookies })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/setcookie', async (req, res) => {
    try {
        // res.cookie(nombre, payload(contenido), opciones)
        // maxAge: ms (milisegundos)
        // Indico al navegador que almacene una cookie
        res.cookie('coderCookie', 'Este es el contenido de la cookie firmado', { maxAge: 60000, signed: true })
        res.status(200).send({ status: 'OK', data: 'Cookie generada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/deletecookie', async (req, res) => {
    try {
        res.clearCookie('coderCookie')
        res.status(200).send({ status: 'OK', data: 'Cookie eliminada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})


// Habitualmente recibiremos datos desde algún formulario (de login por ejemplo),
// y activaremos una cookie para almacenar en navegador PARTE de esos datos, a efectos
// de tenerlos a mano en el frontend.

// Atención, recordar!!!: NUNCA almacenar datos sensibles en una cookie (claves, etc),
// ya que pueden ser fácilmente accedidos y modificados por el cliente al estar en el navegador.
router.post('/', async (req, res) => {
    try {
        res.cookie('coderCookie', { user: req.body.user, email: req.body.email }, { maxAge: 30000, signed: true })
        res.status(200).send({ status: 'OK', data: 'Cookie generada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router