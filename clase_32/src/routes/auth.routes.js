import { Router } from 'express'
import passport from 'passport'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword, generateToken, passportCall, listNumbers, longExecutionFunction, sendConfirmation } from '../utils.js'
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
            
            res.cookie('codertoken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true });
            setTimeout(() => res.redirect('/profilejwt'), 200);
        } else {
            res.redirect('/login?msg=Datos no válidos');
            // res.status(401).send({ status: 'ERR', data: 'Datos no válidos' })
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

router.post('/register', passport.authenticate('registerAuth', { failureRedirect: '/api/auth/failregister' }), sendConfirmation('email', 'register'), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Usuario registrado, por favor revise su casilla de correo.' })
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