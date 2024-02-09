import express from 'express';
import mongoose from 'mongoose';
import sessionsRouter from './routes/sessions.router.js';
import { faker } from '@faker-js/faker';
import cluster from 'cluster';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * Todo el proceso de inicio de la app está enmarcado ahora dentro de una condición.
 * isPrimary nos indica si estamos ejecutando la instancia primaria de nuestra app
 * (la que iniciamos manualmente nosotros); si es así, se encarga de utilizar el
 * método fork() de cluster para crear nuevas instancias (workers), tantas como
 * núcleos tengamos disponibles en el procesador (por eso hemos importado os).
 * 
 * Como adicional, habilitamos un listener "disconnect", en caso que alguna de las
 * instancias caiga, cluster ejecutará un fork() para crear una nueva que la reemplace.
 */
if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) cluster.fork();

    cluster.on('disconnect', worker => {
        console.log(`Se cayó la instancia PID ${worker.process.pid}`);
        cluster.fork();
    });
} else {
    const connection = mongoose.connect(process.env.MONGO || 'mongodb://127.0.0.1:27017/coder55605');
    
    app.use(express.json());
    app.use('/api/sessions',sessionsRouter);
    
    app.get('/api/test/user',(req,res)=>{
        let first_name = faker.name.firstName();
        let last_name = faker.name.lastName();
        let email = faker.internet.email();
        let password =  faker.internet.password();
        res.send({first_name,last_name,email,password})
    })
    
    app.listen(PORT, () => console.log(`Instancia activa puerto ${PORT} PID ${process.pid}`));
}