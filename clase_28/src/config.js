import dotenv from 'dotenv';
import { Command } from 'commander';

const commandLineOptions = new Command();
commandLineOptions
    .option('--mode <mode>')
    .option('--port <port>')
commandLineOptions.parse()

/**
 * De acuerdo al valor de la opción de línea de comandos "mode",
 * cargamos un archivo de variables de entorno u otro
*/
// dotenv.config();
switch (commandLineOptions.opts().mode) {
    case 'prod':
        dotenv.config({ path: './.env.prod'});
        break;
    
    case 'devel':
    default:
        dotenv.config({ path: './.env.devel'});
}

const config = {
    PORT: commandLineOptions.opts().port || 3000,
    MONGOOSE_URL: process.env.MONGOOSE_URL_REMOTE,
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
    MODE: commandLineOptions.opts().mode || 'devel'
};

export default config;