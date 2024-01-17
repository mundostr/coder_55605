import { Router } from 'express'
import passport from 'passport'
import { fork } from 'child_process'

import userModel from '../models/user.model.js'
import { createHash, isValidPassword, generateToken, passportCall, listNumbers, longExecutionFunction } from '../utils.js'
import initPassport from '../auth/passport.auth.js'

initPassport()

const router = Router()

const authenticationMid = (req, res, next) => {
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

const authorizationMid = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ status: 'ERR', data: 'Usuario no autorizado' })
        if (req.user.role !== role) return res.status(403).send({ status: 'ERR', data: 'Sin permisos suficientes' })
        next();
    }
}

const handlePolicies = policies => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ status: 'ERR', data: 'Usuario no autorizado' })

        const userRole = req.user.role.toUpperCase();
        policies.forEach((policy, index) => policies[index] = policies[index].toUpperCase());

        if (policies.includes('PUBLIC')) return next();
        if (policies.includes(userRole)) return next();
        res.status(403).send({ status: 'ERR', data: 'Sin permisos suficientes' });
    }
}

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
        req.user = {};
        res.clearCookie('codertoken');

        req.session.destroy((err) => {
            if (err) {
                res.status(500).send({ status: 'ERR', data: err.message })
            } else {
                res.redirect('/login')
            }
        })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/admin', authenticationMid, async (req, res) => {
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

router.get('/google', passport.authenticate('googleAuth', { scope: ['email', 'profile'] }), async (req, res) => {
})

router.get('/githubcallback', passport.authenticate('githubAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
})

router.get('/googlecallback', passport.authenticate('googleAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
})

// router.get('/current', passportCall('jwtAuth', { session: false }), authorizationMid('admin'), async (req, res) => {
router.get('/current', passportCall('jwtAuth', { session: false }), handlePolicies(['user', 'premium', 'admin']), async (req, res) => {
    res.status(200).send({ status: 'OK', data: req.user })
})

/**
 * Ruta de prueba para testear una llamada a la función listnumbers.
 * Si hacemos por ejemplo listNumbers(1, 15, 3, 22, 5), sacará ok por consola los valores,
 * si en cambio la llamamos con listNumbers(1, 15, 'tres', 22, 5), dispará un evento de
 * error que capturará el listener process.on('uncaughtException' en app.js.
 */
router.get('/listnumbers', async (req, res) => {
    listNumbers(1, 15, 'tres', 22, 5);
    res.status(200).send('Este endpoint es solo de prueba para process.on() clase 24.');
})

/**
 * Ruta de prueba para testear la llamada a una función de larga ejecución.
 * Si en el mismo momento intentamos acceder a otro endpoint, veremos que el
 * sistema estará temporalmente bloqueado.
 */
router.get('/long', async (req, res) => {
    res.status(200).send({ status: 'OK', data: longExecutionFunction() });
})

/**
 * Misma función ejecutada pero a través de un proceso child (hijo)
 * Vemos como podemos crear ese proceso extra con fork() y asignarle
 * la rutina desde un archivo, de esta forma, si probamos acceder en
 * el mismo momento a otro endpoint, veremos que ahora el sistema sigue
 * funcionando con normalidad, ya que la función de cálculo que tarda
 * está siendo manejada por el hijo, quedando libre el proceso principal
 * (padre) para recibir otras solicitudes.
 */
router.get('/longfile', async (req, res) => {
    const childProcess = fork('./src/longExecutionFunction.js');
    childProcess.send('iniciar');
    childProcess.on('message', result => {
        res.status(200).send({ status: 'OK', data: result });
    });
})

router.post('/login_session', async (req, res) => {
    try {
        const { email, pass } = req.body

        const userInDb = await userModel.findOne({ email: email })
        if (userInDb !== null && isValidPassword(userInDb, pass)) {
            const { _id, password, ...userInDbSafe } = userInDb._doc;
            
            req.session.user = userInDbSafe
            res.redirect('/profile')
        } else {
            res.status(401).send({ status: 'ERR', data: 'Datos no válidos' })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/login_manual_jwt', async (req, res) => {
    try {
        const { email, pass } = req.body

        const userInDb = await userModel.findOne({ email: email })
        if (userInDb !== null && isValidPassword(userInDb, pass)) {
            const { _id, password, ...userInDbSafe } = userInDb._doc;

            const access_token = generateToken(userInDbSafe, '1h')
            res.cookie('codertoken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true })
            // res.status(200).send({ status: 'OK', data: { access: 'authorized', token: access_token } })
            setTimeout(() => res.redirect('/profilejwt'), 200);
        } else {
            res.status(401).send({ status: 'ERR', data: 'Datos no válidos' })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/login_passport_jwt', passport.authenticate('loginAuth', { failureRedirect: '/login?msg=Email o clave no válidos', session: false }), async (req, res) => {
    const access_token = generateToken(req.user, '1h')
    res.cookie('codertoken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    setTimeout(() => res.redirect('/profilejwt'), 200);
})

router.post('/register', passport.authenticate('registerAuth', { failureRedirect: '/api/auth/failregister' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Usuario registrado' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/restore', passport.authenticate('restoreAuth', { failureRedirect: '/api/auth/failrestore' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Clave actualizada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router