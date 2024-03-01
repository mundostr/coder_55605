import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// Importamos swaggerJsdoc y swaggerUiExpress
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect('mongodb://127.0.0.1:27017/coder55605');

// Generamos la configuración inicial para swaggerJsdoc
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación sistema AdoptMe',
            description: 'Esta documentación cubre toda la API habilitada para AdoptMe',
        },
    },
    apis: ['./src/docs/**/*.yaml'], // todos los archivos de configuración de rutas estarán aquí
};
const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pets', petsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/adoptions', adoptionsRouter);
// Inyectamos Swagger como middleware para que genere y sirva la documentación en este endpoint
// Algo muy cómodo que nos permite Swagger, es no solo documentar las opciones de cada endpoint,
// sino también poder probarlo allí mismo en la lista de documentación (tryout).
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));