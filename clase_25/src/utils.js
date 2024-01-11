import * as url from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from './config.js'

export const __filename = url.fileURLToPath(import.meta.url)

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export const generateToken = (payload, duration) => jwt.sign(payload, config.SECRET_KEY, { expiresIn: duration })

export const authToken = (req, res, next) => {
    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1]: undefined;
    const cookieToken = req.cookies && req.cookies['codertoken'] ? req.cookies['codertoken']: undefined;
    const queryToken = req.query.access_token ? req.query.access_token: undefined;  
    const receivedToken = headerToken || cookieToken || queryToken
    
    if (!receivedToken) return res.redirect('/login')

    jwt.verify(receivedToken, config.SECRET_KEY, (err, credentials) => {
        if (err) return res.status(403).send({ status: 'ERR', data: 'No autorizado' })
        req.user = credentials
        next()
    })
}

export const passportCall = (strategy, options) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, options, (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).send({ status: 'ERR', data: info.messages ? info.messages: info.toString() });
            req.user = user;
            next();
        })(req, res, next);
    }
}

/**
Función de muestra para ver cómo opera el listener exit de process,
que capturará el exit con error -4 (o el que fuere) y mostrará o procesará
lo que se deba en ese caso.

Es una primer introducción al uso de listeners para entender su funcionamiento,
veremos más adelante que esta opción se aplica en distintos casos.
 */
export const listNumbers = (...numbers) => {
    numbers.forEach(number => {
        if (isNaN(number)) {
            console.log('Invalid parameters');
            process.exit(-4);
        } else {
            console.log(number);
        }
    })
}

/**
Función de prueba para verificación de bloqueo.
Cualquier rutina que tarde tiempo en ejecutarse (como esta que calcula
la sumatoria de un nro grande), bloqueará temporalmente las demás solicitudes
a endpoints de nuestra API, por lo cual deberemos buscar una solución, como
el uso de procesos hijos (child processes) creados por el proceso principal (padre)
a los cuales derivar esa ejecución.
*/
export const longExecutionFunction = () => {
    let result = 0;
    for (let i = 0; i < 3e9; i++) result += i;
    return result;
}