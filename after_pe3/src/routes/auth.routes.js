import { Router } from 'express';
import userModel from '../models/user.model.js';
import initPassportStrategies, { passportCall } from '../auth/passport.auth.js';
import { isValidPassword, generateToken, sendConfirmation } from '../utils.js';
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';

initPassportStrategies();

const router = Router();

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

router.get('/failregister', async (req, res) => {
    res.status(400).send({ status: 'ERR', data: 'El email ya existe o faltan datos obligatorios' })
})

router.get('/failrestore', async (req, res) => {
    res.status(400).send({ status: 'ERR', data: 'El email no existe o faltan datos obligatorios' })
})

router.get('/github', passportCall('githubAuth', { scope: ['user:email'] }), async (req, res) => {
})

router.get('/google', passportCall('googleAuth', { scope: ['email', 'profile'] }), async (req, res) => {
})

router.get('/githubcallback', passportCall('githubAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
})

router.get('/googlecallback', passportCall('googleAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
})

router.get('/current', authToken, handlePolicies(['admin']), async (req, res) => {
    const { password, ...userSafe } = req.user;
    res.status(200).send({ status: 'OK', data: userSafe });
})

router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body

        const userInDb = await userModel.findOne({ email: email })
        if (userInDb !== null && isValidPassword(userInDb, pass)) {
            const { password, ...userInDbSafe } = userInDb._doc;
            const access_token = generateToken(userInDbSafe, '1h')
            
            res.cookie('codertoken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true });
            setTimeout(() => res.redirect('/profilejwt'), 200);
        } else {
            res.redirect('/login?msg=Datos no válidos');
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/register', passportCall('registerAuth', { failureRedirect: '/api/auth/failregister' }), sendConfirmation('email', 'register'), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Usuario registrado, por favor revise su casilla de correo.' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/restore', passportCall('restoreAuth', { failureRedirect: '/api/auth/failrestore' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Clave actualizada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router;