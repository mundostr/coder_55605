import { Router } from 'express'
import passport from 'passport'

import userModel from '../models/user.model.js'
import { createHash, isValidPassword, generateToken, passportCall } from '../utils.js'
import initPassport from '../config/passport.config.js'

// Inicializamos instancia de estrategia/s
initPassport()

const router = Router()

// Creamos un pequeño middleware para una autorización básica
// Observar que aparece next, además de req y res.
// next nos permite continuar la secuencia de la "cadena".
// En este caso, si el usuario es admin, llamanos a next, caso contrario
// devolvemos un error 403 (Forbidden), no se puede acceder al recurso.
// Si ni siquiera se dispone de req.session.user, directamente devolvemos error
// de no autorizado.
const auth = (req, res, next) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                next()
            } else {
                res.status(403).send({ status: 'ERR', data: 'Usuario no admin' })
            }
        } else {
            res.status(401).send({ status: 'ERR', data: 'Usuario no autorizado' })
        }   
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
}

// Este mid de autorización nos permite comenzar a manejar el tema de roles, es decir,
// niveles de permisos de usuario
const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ status: 'ERR', data: 'No autenticado' });
        if (req.user.role !== role) return res.status(403).send({ status: 'ERR', data: 'Sin permisos suficientes' });
        next();
    }
}

// Este endpoint es para testeo.
// Si es la primer visita desde esa instancia de navegador, req.session.visits no existirá,
// por ende se inicializará en 1 y se dará la bienvenida.
// En sucesivas visitas, ya estará disponible en req.session, por ende solo se lo incrementará.
// Continuará incrementando visita a visita hasta que caduque o se destruya la sesión.
router.get('/', async (req, res) => {
    try {
        if (req.session.visits) {
            req.session.visits++
            res.status(200).send({ status: 'OK', data: `Cantidad de visitas: ${req.session.visits}` })
        } else {
            req.session.visits = 1
            res.status(200).send({ status: 'OK', data: 'Bienvenido al site!' })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('codertoken');
        
        // req.session.destroy nos permite destruir la sesión
        // De esta forma, en la próxima solicitud desde ese mismo navegador, se iniciará
        // desde cero, creando una nueva sesión y volviendo a almacenar los datos deseados.
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send({ status: 'ERR', data: err.message })
            } else {
                // El endpoint puede retornar el mensaje de error, o directamente
                // redireccionar a login o una página general.
                // res.status(200).send({ status: 'OK', data: 'Sesión finalizada' })
                res.redirect('/login')
            }
        })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

// Este es un endpoint "privado", solo visible para admin.
// Podemos ver que el contenido no realiza ninguna verificación, ya que la misma se hace
// inyectando el middleware auth en la cadena (ver definición auth arriba).
// Si todo va bien en auth, se llamará a next() y se continuará hasta aquí, caso contrario
// la misma rutina en auth() cortará y retornará la respuesta con el error correspondiente.
router.get('/admin', auth, async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Estos son los datos privados' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

// Endpoint de uso interno, solo para generar claves hasheadas de prueba cuando haga falta
router.get('/hash/:pass', async (req, res) => {
    res.status(200).send({ status: 'OK', data: createHash(req.params.pass) })
})

router.get('/failregister', async (req, res) => {
    res.status(400).send({ status: 'ERR', data: 'El email ya existe o faltan datos obligatorios' })
})

router.get('/failrestore', async (req, res) => {
    res.status(400).send({ status: 'ERR', data: 'El email no existe o faltan datos obligatorios' })
})

router.get('/github', passport.authenticate('githubAuth', { scope: ['user:email'] }), async (req, res) => {
})

router.get('/githubcallback', passport.authenticate('githubAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = { username: req.user.email, admin: true }
    // req.session.user = req.user
    res.redirect('/profile')
})

// router.get('/current', passport.authenticate('jwtAuth', { session: false }), async (req, res) => {
// La función passportCall nos permite una mejor intercepción de errores (ver utils.js)
// Este endpoint muestra cómo podemos encadenar distintos middlewares en el proceso,
// aquí primero autenticamos y luego autorizamos.
router.get('/current', passportCall('jwtAuth', { session: false }), authorization('admin'), async (req, res) => {
    res.status(200).send({ status: 'OK', data: req.user })
})

// Nuestro primer endpoint de login!, básico por el momento, con algunas
// validacione "hardcodeadas", pero nos permite comenzar a entender los conceptos.
router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body

        // Fundamental!!!: los datos de req.session se almacenan en SERVIDOR, NO en navegador.
        // Pronto cambiaremos este control hardcoded por el real desde base de datos.

        const userInDb = await userModel.findOne({ email: email })
        if (userInDb !== null && isValidPassword(userInDb, pass)) {
            // Utilizando sessions
            // req.session.user = { username: email, admin: true }
            // De nuevo, podemos directamente redireccionar una vez que el usuario se identificó correctamente.
            // res.status(200).send({ status: 'OK', data: 'Sesión iniciada' })
            // res.redirect('/profile')

            // Utilizando tokens JWT
            // Generamos el token e instruímos al navegador para que lo guarde en una cookie
            // También lo enviamos como dato en la respuesta
            const access_token = generateToken({ username: email, role: 'admin' }, '1h')
            res.cookie('codertoken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true })
            res.status(200).send({ status: 'OK', data: { access: 'authorized', token: access_token } })
            // res.redirect(`/profilejwt?access_token=${access_token}`)
        } else {
            res.status(401).send({ status: 'ERR', data: 'Datos no válidos' })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/register', passport.authenticate('registerAuth', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Usuario registrado' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/restore', passport.authenticate('restoreAuth', { failureRedirect: '/api/sessions/failrestore' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Clave actualizada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router