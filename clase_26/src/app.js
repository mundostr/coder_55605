import express from 'express';
import mongoose from 'mongoose';

import toysRouter from './routes/toys.routes.js';

try {
    await mongoose.connect('mongodb+srv://coder55605:coder2023@cluster0.4qaobt3.mongodb.net/coder55605');

    const app = express();

    app.listen(5000, () => {
        console.log('Servidor express activo');
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/toys', toysRouter);
} catch (err) {
    console.log(`Backend: error al inicializar (${err.message})`);
}