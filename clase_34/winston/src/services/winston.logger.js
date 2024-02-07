/**
 * Habilitación de logger winston para salida por consola y archivo
 * 
 * Los niveles de error standard son los siguientes:
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 * (del más severo [error] al menos importante [silly])
 * 
 * Ver también debajo el ejemplo de niveles de error personalizados
 */

import winston from 'winston';

import config from '../config.js';

// No es imprescindible, pero si lo necesitamos podemos crear niveles de error personalizados,
// para REEMPLAZAR a los nivels standard (ver arriba).
const customErrLevels = {
    levels: { high: 0, medium: 1, low: 2 },
    colors: { high: 'red', medium: 'yellow', low: 'blue' }
}

// Podemos crear tantos loggers como necesitemos, nos manejaremos al menos con uno
// para desarrollo y otro para producción
// En este caso el de desarrollo cuenta con 1 transporte habilitado, para sacar logs
// únicamente por consola, desde nivel verbose hacia arriba.
const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'verbose' })
    ]
});

// Este logger para producción, tiene 2 transportes habilitados, para sacar logs
// por consola, desde nivel http hacia arriba, y registrar también en archivo, desde
// nivel warn hacia arriba
const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'http' }),
        new winston.transports.File({ level: 'warn', filename: `${config.__DIRNAME}/logs/errors.log`})
    ]
});

// Este logger también utiliza 2 transportes, pero aplicando los niveles personalizados
// definidos arriba. Los niveles standard ya NO estarán disponibles, es decir,
// al inyectarlo desde el middleware, ya no podremos hacer por ej un req.logger.warn,
// tendremos req.logger.high, medium o low que son los niveles que hemos definido.
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

// Este middleware inyecta el logger en el objeto req,
// es el que hemos habilitado a nivel global en app.js.
const addLogger = (req, res, next) => {
    // Según estemos en modo desarrollo o producción, cargamos
    // un logger u otro. Probar también el customLogger
    req.logger = config.MODE === 'devel' ? devLogger : prodLogger;
    req.logger.http(`${new Date().toDateString()} ${req.method} ${req.url}`);
    next();
}

export default addLogger;