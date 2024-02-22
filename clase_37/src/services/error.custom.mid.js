import config from '../config.js';

const customErrorMiddleware = () => {
    return (err, req, res, next) => {
        const code = err.code || 500;
        let message = err.message || 'Hubo un problema, error desconocido';
        if (err.moreInfo) message = `${message} (${err.moreInfo})`;
        
        return res.status(code).send({
            status: 'ERR',
            data: message,
            // stack: config.MODE === 'devel' ? err.stack : {}
        })
    }
}

export default customErrorMiddleware;