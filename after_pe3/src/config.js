import * as url from 'url';
import dotenv from 'dotenv';
import { Command } from 'commander';

const commandLineOptions = new Command();
commandLineOptions
    .option('--mode <mode>')
    .option('--port <port>')
commandLineOptions.parse();

switch (commandLineOptions.opts().mode) {
    case 'prod':
        dotenv.config({ path: './.env.prod'});
        break;
    
    case 'devel':
    default:
        dotenv.config({ path: './.env.devel'});
}

const config = {
    __FILENAME: url.fileURLToPath(import.meta.url),
    __DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    PORT: commandLineOptions.opts().port || process.env.PORT || 3000,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DDBB: process.env.MYSQL_DDBB,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    SECRET_KEY: process.env.SECRET_KEY,
    UPLOAD_DIR: 'public/img',
    GITHUB_AUTH: {
        clientId: process.env.GITHUB_AUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        callbackUrl: `http://localhost:${commandLineOptions.opts().port || 3000}/api/auth/githubcallback`
    },
    GOOGLE_AUTH: {
        clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        callbackUrl: `http://localhost:${commandLineOptions.opts().port || 3000}/api/auth/googlecallback`
    },
    PERSISTENCE: process.env.PERSISTENCE,
    MODE: commandLineOptions.opts().mode || 'devel',
    GOOGLE_APP_EMAIL: process.env.GOOGLE_APP_EMAIL,
    GOOGLE_APP_PASS: process.env.GOOGLE_APP_PASS,
    RESEND_API_EMAIL: process.env.RESEND_API_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_VIRTUAL_NUMBER: process.env.TWILIO_VIRTUAL_NUMBER,
    VONAGE_API_KEY: process.env.VONAGE_API_KEY,
    VONAGE_API_SECRET: process.env.VONAGE_API_SECRET,
    MAIN_SMS_NUMBER: process.env.MAIN_SMS_NUMBER
};

export default config;