import passport from 'passport'
import LocalStrategy from 'passport-local'
import GithubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'passport-jwt'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import config from '../config.js'

const initPassport = () => {
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

    const verifyRegistration = async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, gender } = req.body

            if (!first_name || !last_name || !email || !gender) {
                return done('Se requiere first_name, last_name, email y gender en el body', false)
            }

            const user = await userModel.findOne({ email: username })

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

    const verifyRestoration = async (req, username, password, done) => {
        try {
            if (username.length === 0 || password.length === 0) {
                return done('Se requiere email y pass en el body', false)
            }

            const user = await userModel.findOne({ email: username })

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
            /**
             * Al igual que en el caso de Github, tomamos datos del profile para armar
             * nuestro user. Podríamos por supuesto verificar existencia en nuestra bbdd
             * y cargar un nuevo usuario, como lo hacemos en la estrategia de Github.
             */
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
    
    passport.use('loginAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyLogin))

    passport.use('registerAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyRegistration))

    passport.use('restoreAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyRestoration))

    passport.use('githubAuth', new GithubStrategy({
        /**
         * Ver como ahora los datos sensibles ya no están aquí en el código,
         * se recuperan en tiempo de ejecución desde el objeto config, el cual
         * a su vez los recupera desde variables de entorno o línea de comandos.
         */
        clientID: config.GITHUB_AUTH.clientId,
        clientSecret: config.GITHUB_AUTH.clientSecret,
        callbackURL: config.GITHUB_AUTH.callbackUrl,
        passReqToCallback: true
    }, verifyGithub))

    passport.use('googleAuth', new GoogleStrategy({
        clientID: config.GOOGLE_AUTH.clientId,
        clientSecret: config.GOOGLE_AUTH.clientSecret,
        callbackURL: config.GOOGLE_AUTH.callbackUrl,
        passReqToCallback: true
    }, verifyGoogle))

    passport.use('jwtAuth', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.SECRET_KEY
    }, verifyJwt))
        
    passport.serializeUser((user, done) => {
        done(null, user);
    })
        
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}

export default initPassport