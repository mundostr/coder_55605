import { Router } from 'express';
import userModel from '../models/user.model.js';
import initPassportStrategies, { passportCall } from '../auth/passport.auth.js';
import { isValidPassword, generateToken, sendConfirmation } from '../utils.js';
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';
import { catcher } from '../utils.js';

initPassportStrategies();

const router = Router();

router.get('/logout', catcher(async (req, res) => {
    res.clearCookie('codertoken');
    res.redirect('/login');
}));

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

router.get('/githubcallback', passportCall('githubAuth', { failureRedirect: '/login' }), catcher(async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
}));

router.get('/googlecallback', passportCall('googleAuth', { failureRedirect: '/login' }), catcher(async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
}));

router.get('/current', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    const { password, ...userSafe } = req.user;
    res.status(200).send({ status: 'OK', data: userSafe });
}));

router.post('/login', catcher(async (req, res) => {
    const { email, pass } = req.body;

    const userInDb = await userModel.findOne2({ email: email });
    if (userInDb !== null && isValidPassword(userInDb, pass)) {
        const { password, ...userInDbSafe } = userInDb._doc;
        const access_token = generateToken(userInDbSafe, '1h');
        res.cookie('codertoken', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        setTimeout(() => res.redirect('/profilejwt'), 200);
    } else {
        res.redirect('/login?msg=Datos no válidos');
    }
}));

router.post('/register', passportCall('registerAuth', { failureRedirect: '/api/auth/failregister' }), sendConfirmation('email', 'register'), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: 'Usuario registrado, por favor revise su casilla de correo.' });
}));

router.post('/restore', passportCall('restoreAuth', { failureRedirect: '/api/auth/failrestore' }), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: 'Clave actualizada' });
}));

export default router;