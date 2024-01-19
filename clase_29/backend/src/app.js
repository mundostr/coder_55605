import cors from 'cors';
import express from 'express';

import orderRouter from './routes/order.routes.js';
import productRouter from './routes/product.routes.js';
import userRouter from './routes/user.routes.js';

import config from './config.js';

import MongoSingleton from './services/mongo.singleton.js';

try {
    const app = express();
    await MongoSingleton.getInstance();
    
    const httpServer = app.listen(config.PORT, () => {
        console.log(`Backend activo modo ${config.MODE} puerto ${config.PORT}`);
    })
    
    app.use(cors({
        origin: 'http://127.0.0.1:5500',
        methods: 'GET,POST'
    }));

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    app.use('/api/orders', orderRouter);
    app.use('/api/products', productRouter);
    app.use('/api/users', userRouter);
    
    app.use('/static', express.static(`${config.__DIRNAME}/public`));

    app.all('*', (req, res, next)=>{
        res.status(404).send({ status: 'ERR', data: 'Página no encontrada' });
    })
} catch(err) {
    console.log(`Backend: error al inicializar (${err.message})`)
}