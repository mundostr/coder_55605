/**
 * passport.local siempre requiere 2 cosas: username y password
 * 
 * podemos usar el parámetro usernameField para cambiar el nombre del campo que
 * manejaremos como usuario (email en nuestro caso)
 * 
 * passport utiliza un callback done():
 *  - parámetro 1: el error (null indica que no hay error)
 *  - parámetro 2: el objeto con datos de usuario que se devuelve en la respuesta
 *      - done(null, user) -> user tendrá los datos de usuario
 *      - done(null, false) -> no hay error pero los datos de usuario no se devuelven
 * 
 * passport.use() nos permite configurar distintas estrategias
 */

import passport from 'passport'
import LocalStrategy from 'passport-local'
import GithubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'passport-jwt'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

const initPassport = () => {
    // Función utilizada por la estrategia loginAuth
    const verifyLogin = async (req, username, password, done) => {
        try {
            const userInDb = await userModel.findOne({ email: username })
            
            if (userInDb !== null && isValidPassword(userInDb, password)) {
                const { _id, password, ...user } = userInDb._doc;
                if (user) return done(null, user);
            }

            done(null, false);
        } catch (err) {
            return done(`Error passport login: ${err.message}`)
        }
    }

    // Función utilizada por la estrategia registerAuth
    const verifyRegistration = async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, gender } = req.body

            if (!first_name || !last_name || !email || !gender) {
                return done('Se requiere first_name, last_name, email y gender en el body', false)
            }

            const user = await userModel.findOne({ email: username })

            // El usuario ya existe, llamamos a done() para terminar el proceso de
            // passport, con null (no hay error) y false (sin devolver datos de usuario)
            if (user) return done(null, false)
            
            const newUser = {
                first_name,
                last_name,
                email,
                gender,
                password: createHash(password)
            }

            const process = await userModel.create(newUser)

            return done(null, process)
        } catch (err) {
            return done(`Error passport register: ${err.message}`)
        }
    }

    // Función utilizada por la estrategia restoreAuth
    const verifyRestoration = async (req, username, password, done) => {
        try {
            if (username.length === 0 || password.length === 0) {
                return done('Se requiere email y pass en el body', false)
            }

            const user = await userModel.findOne({ email: username })

            // El usuario no existe, no podemos restaurar nada.
            // Llamamos a done() para terminar el proceso de
            // passport, con null (no hay error) y false (sin devolver datos de usuario)
            if (!user) return done(null, false)

            const process = await userModel.findOneAndUpdate({ email: username }, { password: createHash(password) })

            return done(null, process)
        } catch (err) {
            return done(`Error passport restoration: ${err.message}`)
        }
    }

    const verifyGithub = async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email })

            if (!user) {
                const name_parts = profile._json.name.split(' ')
                const newUser = {
                    first_name: name_parts[0],
                    last_name: name_parts[1],
                    email: profile._json.email,
                    gender: 'NA',
                    password: ' '
                }
    
                const process = await userModel.create(newUser)
    
                return done(null, process)
            } else {
                return done(null, user)
            }
        } catch (err) {
            return done(`Error passport Github: ${err.message}`)
        }
    }

    const verifyGoogle = async (req, accessToken, refreshToken, profile, done) => {
        try {
            // Simplemente tomamos datos del profile y generamos un user con nuestro formato.
            // Deberíamos verificar y cargar un nuevo usuario en bbdd como en la estrategia de Github
            const user = {
                first_name: profile.name.familyName,
                last_name: profile.name.givenName,
                email: profile.emails[0].value,
                role: 'user'
            }

            return done(null, user);
        } catch (err) {
            return done(`Error passport Google: ${err.message}`)
        }
    }

    const verifyJwt = async (payload, done) => {
        try {
            return done (null, payload);
        } catch (err) {
            return done(err);
        }
    }

    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) token = req.cookies['codertoken'];
        return token;
    }
    
    // Creamos estrategia local de autenticación para login
    passport.use('loginAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyLogin))

    // Creamos estrategia local de autenticación para registro
    passport.use('registerAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyRegistration))

    // Creamos estrategia local de autenticación para restauración de clave
    passport.use('restoreAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyRestoration))

    // Creamos estrategia para autenticación externa con Github
    passport.use('githubAuth', new GithubStrategy({
        clientID: 'Iv1.0c3c12fcc83c9770',
        clientSecret: 'ea4f406cbd6be3c160113f683ab29059a0a21072',
        callbackURL: 'http://localhost:5000/api/auth/githubcallback',
        passReqToCallback: true
    }, verifyGithub))

    // Creamos estrategia para autenticación externa con Google
    passport.use('googleAuth', new GoogleStrategy({
        clientID: '522668187208-dc9cgk6mja7m0rd5vlfbas2pjdnknhnn.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5000/api/auth/googlecallback',
        passReqToCallback: true
    }, verifyGoogle))

    passport.use('jwtAuth', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'Coder55605_Key_Jwt'
    }, verifyJwt))
        
    // Métodos "helpers" de passport para manejo de datos de sesión
    // Son de uso interno de passport, normalmente no tendremos necesidad de tocarlos.
    passport.serializeUser((user, done) => {
        done(null, user);
    })
        
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}

export default initPassport