import dotenv from 'dotenv';
import { Command } from 'commander';
import * as url from 'url';

const commandLineOptions = new Command();
commandLineOptions
    .option('--mode <mode>')
    .option('--port <port>')
commandLineOptions.parse()

switch (commandLineOptions.opts().mode) {
    case 'prod':
        dotenv.config({ path: './.env.prod'});
        break;
    
    case 'devel':
    default:
        dotenv.config({ path: './.env.devel'});
}

const config = {
    PORT: commandLineOptions.opts().port || process.env.PORT || 3000,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    PERSISTENCE: process.env.PERSISTENCE,
    MODE: commandLineOptions.opts().mode || 'devel',
    __DIRNAME: url.fileURLToPath(new URL('.', import.meta.url))
};

export default config;