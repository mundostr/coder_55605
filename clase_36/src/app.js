import cors from 'cors';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import usersRouter from './routes/users.routes.js';
import cartsRouter from './routes/carts.routes.js';
import authsRouter from './routes/auth.routes.js';
import errorsDictionary from './services/error.dictionary.js';
import customErrorMiddleware from './services/error.custom.mid.js';
import addLogger from './services/logger.winston.js';
import cluster from 'cluster';
import os from 'os';

import config from './config.js';

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) cluster.fork();

    cluster.on('disconnect', worker => {
        console.log(`Se cayó la instancia PID ${worker.process.pid}`);
        cluster.fork();
    });
} else {
    try {
        const app = express();
        const httpServer = app.listen(config.PORT, () => {
            console.log(`Backend activo modo ${config.MODE} puerto ${config.PORT} pid ${process.pid}`);
        });
    
        app.engine('handlebars', handlebars.engine());
        app.set('views', `${config.__DIRNAME}/views`);
        app.set('view engine', 'handlebars');
        
        app.use(express.json());
        app.use(passport.initialize());
        app.use(cookieParser(config.SECRET_KEY));
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({ origin: '*', methods: 'GET,POST,PUT,PATCH,DELETE' }));
    
        app.use(addLogger);
        app.use('/', viewsRouter);
        app.use('/api/products', productsRouter);
        app.use('/api/users', usersRouter);
        app.use('/api/carts', cartsRouter);
        app.use('/api/auth', authsRouter);
        app.use('/static', express.static(`${config.__DIRNAME}/public`));
        app.use(customErrorMiddleware());
    
        app.all('*', (req, res, next)=>{
            res.status(404).send({ status: 'ERR', data: errorsDictionary.PAGE_NOT_FOUND.message });
        });
    } catch(err) {
        console.log(`Backend: error al inicializar (${err.message})`)
    }
}