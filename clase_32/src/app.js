import cors from 'cors';
import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from "socket.io"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import passport from 'passport'

import { __dirname } from './utils.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'
import usersRouter from './routes/users.routes.js'
import cartsRouter from './routes/carts.routes.js'
import ordersRouter from './routes/orders.routes.js'
import cookiesRouter from './routes/cookies.routes.js'
import authsRouter from './routes/auth.routes.js'
import PetsRouter from './routes/pets.routes.js'

import config from './config.js'
import errorsDictionary from './services/error.dictionary.js';

try {    
    const app = express()
    const httpServer = app.listen(config.PORT, () => {
        console.log(`Backend activo modo ${config.MODE} puerto ${config.PORT}`);

        process.on('exit', code => {
            switch (code) {
                case -4:
                    console.log('Proceso finalizado por argumentación inválida en una función');
                    break;
                
                default:
                    console.log(`El proceso de servidor finalizó (err: ${code})`);
            }
        })

        process.on('uncaughtException', exception => {
            /* console.error(`ERROR!: ${exception.stack}`); */
            console.error(exception.name);
            console.error(exception.message);
        });
    })
    
    const socketServer = new Server(httpServer, {
        /* cors: {
            origin: "*",
            methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
            credentials: false
        }  */
    })
    
    socketServer.on('connection', socket => {
        socket.on('new_message', data => {
            socketServer.emit('message_added', data)
        })
    })

    app.use(cors({
        origin: '*', // http://127.0.0.1:5500
        methods: 'GET,POST,PUT,PATCH,DELETE'
    }));

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser(config.SECRET_KEY))
    
    const fileStorage = FileStore(session)
    app.use(session({
        // ttl: time to live, tiempo de vida de la sesión en segs
        // store: new fileStorage({ path: './sessions', ttl: 60, retries: 0 }), // ARCHIVO
        store: MongoStore.create({ mongoUrl: config.MONGOOSE_URL, mongoOptions: {}, ttl: 60, clearInterval: 5000 }), // MONGODB
        secret: config.SECRET_KEY,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.engine('handlebars', handlebars.engine())
    app.set('views', `${__dirname}/views`)
    app.set('view engine', 'handlebars')
    app.set('socketServer', socketServer)

    app.use('/', viewsRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/carts', cartsRouter)
    app.use('/api/orders', ordersRouter)
    app.use('/api/cookies', cookiesRouter)
    app.use('/api/auth', authsRouter)
    app.use('/api/pets', new PetsRouter().getRouter());

    app.use('/static', express.static(`${__dirname}/public`))

    // Middleware de captura general de errores
    // IMPORTANTE, debe estar antes del app.all().
    app.use((err, req, res, next) => {
        const code = err.code || 500;
        const message = err.message || 'Hubo un problema, error desconocido';
        
        return res.status(code).send({
            status: 'ERR',
            data: message,
            // Habilitar si se quiere más info del error en modo development
            // stack: config.MODE === 'devel' ? err.stack : {}
        });
    });

    app.all('*', (req, res, next)=>{
        res.status(404).send({ status: 'ERR', data: errorsDictionary.PAGE_NOT_FOUND.message });
    });
} catch(err) {
    console.log(`Backend: error al inicializar (${err.message})`)
}