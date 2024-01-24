import * as url from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from './config.js'

// Importamos estos módulos para las pruebas
import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { Vonage } from '@vonage/server-sdk';

/**
 * Este servicio de NodeMailer nos permitirá enviar mails usando un servidor
 * saliente (SMTP) de Google, en el cual nos identificaremos con nuestra cuenta
 * de Gmail, pero ATENCION, NO usaremos la clave habitual, sino una clave de
 * aplicación (config.GOOGLE_APP_PASS) que deberemos activar en:
 * https://myaccount.google.com/apppasswords
 */
const mailerService = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GOOGLE_APP_EMAIL,
        pass: config.GOOGLE_APP_PASS
    }
});

/**
 * Vonage nos simplifica la creación del servicio, solo indicando API key y secret,
 * internamente se encargará de redespachar nuestro correo a través de sus
 * servicios SMTP.
 */
const vonageService = new Vonage({
    apiKey: config.VONAGE_API_KEY,
    apiSecret: config.VONAGE_API_SECRET
});

/**
 * Este es el middleware que inyectaremos en cualquier endpoint que necesite notificar
 * @param {String} type mail o sms
 * @param {String} msg el mensaje a enviar
 */
export const sendConfirmation = (type, msg) => {
    return async (req, res, next) => {
        try {
            let content = {};

            switch (msg) {
                case 'register':
                    content.subject = 'CODERStore confirmación registro';
                    content.html = `<h1>CODERStore confirmación registro</h1><p>Muchas gracias por registrarte ${req.user.first_name} ${req.user.last_name}!, te hemos dado de alta en nuestro sistema con el email ${req.user.email}`;
                    break;
                
                default:
            }

            switch (type) {
                case 'email':
                    // Enviamos utilizando NodeMailer
                    /* await mailerService.sendMail({
                        from: config.GOOGLE_APP_EMAIL,
                        to: req.user.email,
                        subject: content.subject,
                        html: content.html
                    }); */
    
                    // Enviamos utilizando Resend
                    /* const resendService = new Resend(config.RESEND_API_KEY);
                    await resendService.emails.send({
                        from: config.RESEND_API_EMAIL,
                        to: req.user.email,
                        subject: content.subject,
                        html: content.html
                    }); */

                    break;
                
                case 'sms':
                    // Envío utilizando Twilio
                    /* const twilioClient = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
                    const sendSMS = await twilioClient.messages.create({
                        body: content.html,
                        from: config.TWILIO_VIRTUAL_NUMBER,
                        to: config.MAIN_SMS_NUMBER
                    }); */

                    // Envío utilizando Vonage
                    /* const sendSMS = await vonageService.sms.send({
                        from: config.MAIN_SMS_NUMBER,
                        to: config.MAIN_SMS_NUMBER,
                        text: content.html
                    }); */

                    break;
                
                default:
            }

            next();
        } catch (err) {
            res.status(500).send({ status: 'ERR', data: err.message })
        }
    }
}

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
    
    if (!receivedToken) return res.redirect('/login');

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

export const longExecutionFunction = () => {
    let result = 0;
    for (let i = 0; i < 3e9; i++) result += i;
    return result;
}