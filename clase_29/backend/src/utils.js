export const checkRequiredFields = (fields) => {
    return function (req, res, next) {
        for (let field of fields) {
            if (!req.body[field]) { // A este control hay que completarlo con chequeo de no vacío, etc.
                return res.status(400).json({ STATUS: 'ERR', data: `Falta campo requerido: ${field}` });
            }
        }
        next();
    };
};