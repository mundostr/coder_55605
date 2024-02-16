import winston from 'winston';

import config from '../config.js';

// Std err levels
// levels: error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

// Niveles de error personalizados
const customErrLevels = {
    levels: { high: 0, medium: 1, low: 2 },
    colors: { high: 'red', medium: 'yellow', low: 'blue' }
}

// Definición del logger general
const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'http' }),
        new winston.transports.File({ level: 'warn', filename: `${config.__DIRNAME}/logs/errors.log` })
    ]
})

const customLogger = new winston.createLogger({
    levels: customErrLevels.levels,
    format: winston.format.combine(
        winston.format.colorize({ colors: customErrLevels.colors }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({ level: 'low' }),
        new winston.transports.File({ level: 'medium', filename: `${config.__DIRNAME}/logs/errors.log` })
    ]
})

// Definición del logger development
const devLogger = new winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'verbose' })
    ]
})

// Middleware de logging
const addLogger = (req, res, next) => {
    req.logger = config.MODE === 'devel' ? devLogger: logger;
    req.logger.http(`${new Date().toLocaleString()} ${req.method} ${req.url}`);
    next();
}

export default addLogger;