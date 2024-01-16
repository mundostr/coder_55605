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
import MongoSingleton from './services/mongo.singleton.js'

import config from './config.js'

try {
    /* await mongoose.connect(config.MONGOOSE_URL) */
    MongoSingleton.getInstance();
    
    const app = express()
    const httpServer = app.listen(config.PORT, () => {
        /* console.log(`Backend activo puerto ${config.PORT} conectado a BBDD ${config.MONGOOSE_URL}`) */
        console.log(`Backend activo puerto ${config.PORT}`);

        /**
        Aprovechamos el método on() de process para activar un listener que escucha por eventos
        tipo exit. Verificando el código de error, podemos reaccionar ante un cierre de la
        aplicación y ejecutar distintas rutinas de limpieza.

        Ver función de ejemplo en utils.js que dispara el exit.
        */
        process.on('exit', code => {
            switch (code) {
                case -4:
                    console.log('Proceso finalizado por argumentación inválida en una función');
                    break;
                
                default:
                    console.log(`El proceso de servidor finalizó (err: ${code})`);
            }
        })

        /**
         * También podemos capturar errores adicionales, veremos un uso más
         * práctico pronto, agregando un manejo de errores a nuestro sistema.
         */
        process.on('uncaughtException', exception => {
            /* console.error(`ERROR!: ${exception.stack}`); */
            console.error(exception.name);
            console.error(exception.message);
        });
    })
    
    const socketServer = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
            credentials: false
        } 
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
        // Recordar!!!. habilitar UNO de los dos, NO ambos a la vez
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
    // Agregamos este set para poder utilizar socket.io en los endpoints
    // ver ejemplo en products.routes.js
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

    /**
     * Este router "catchall" colocado acá a nivel general de la app,
     * capturará cualquier solicitud a alguna ruta no configurada,
     * con lo cual podremos devolver un mensaje de error personalizado
     * o ejecutar el registro o proceso que deseemos para el caso.
     */
    app.all('*', (req, res, next)=>{
        res.status(404).send({ status: 'ERR', data: 'Página no encontrada' });
    })
} catch(err) {
    console.log(`Backend: error al inicializar (${err.message})`)
}