import * as url from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Este private key es para cifrar el token
const PRIVATE_KEY = 'Coder55605_Key_Jwt'

export const __filename = url.fileURLToPath(import.meta.url)

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export const generateToken = (user, duration) => jwt.sign({ user }, PRIVATE_KEY, { expiresIn: duration })

export const authToken = (req, res, next) => {
    const receivedToken = req.headers.authorization !== undefined ? req.headers.authorization.split(' ')[1] : req.query.access_token
    // if (!receivedToken) return res.status(401).send({ status: 'ERR', data: 'No autenticado' })
    if (!receivedToken) return res.redirect('/login')

    jwt.verify(receivedToken, PRIVATE_KEY, (err, credentials) => {
        if (err) return res.status(403).send({ status: 'ERR', data: 'No autorizado' })
        req.user = credentials.user
        next()
    })
}