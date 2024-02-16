import jwt from 'jsonwebtoken';

import config from '../config.js';

const authToken = (req, res, next) => {
    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1]: undefined;
    const cookieToken = req.cookies && req.cookies['codertoken'] ? req.cookies['codertoken']: undefined;
    const queryToken = req.query.access_token ? req.query.access_token: undefined;
    const receivedToken = headerToken || cookieToken || queryToken

    console.log(cookieToken);
    
    if (!receivedToken) return res.redirect('/login');

    jwt.verify(receivedToken, config.SECRET_KEY, (err, credentials) => {
        if (err) return res.status(403).send({ status: 'ERR', data: 'No autorizado' })
        req.user = credentials
        next()
    });
}

export default authToken;