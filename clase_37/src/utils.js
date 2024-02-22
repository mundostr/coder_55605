import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import CustomError from "./services/error.custom.class.js";
import errorsDictionary from "./services/error.dictionary.js";

import config from './config.js';

const mailerService = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GOOGLE_APP_EMAIL,
        pass: config.GOOGLE_APP_PASS
    }
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
                    await mailerService.sendMail({
                        from: config.GOOGLE_APP_EMAIL,
                        to: req.user.email,
                        subject: content.subject,
                        html: content.html
                    });
    
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
                    break;
                
                default:
            }

            next();
        } catch (err) {
            res.status(500).send({ status: 'ERR', data: err.message })
        }
    }
}

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateToken = (payload, duration) => jwt.sign(payload, config.SECRET_KEY, { algorithm: 'HS256', expiresIn: duration });

export const catcher = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch(err => next(err));
    };
}

export const requiredFieldsInBody = (fields, moreInfo) => {
    return async (req, res, next) => {
        if (!fields.every(field => Object.keys(req.body).includes(field))) {
            return next(new CustomError({ ...errorsDictionary.FEW_PARAMETERS, moreInfo: moreInfo }));
        }

        return next();
    }
}