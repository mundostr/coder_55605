/**
 * express-compression es un ejemplo de módulos adicionales que pueden colaborar en la
 * performance de nuestro servidor.
 * 
 * Podemos habilitarlo a nivel global con use(), o bien a nivel de endpoint, y nos permite
 * comprimir automáticamente contenidos del lado del servidor antes de enviarlos. Esto es
 * muy útil para reducir tráfico, especialmente en el caso de archivos de texto, pero
 * CUIDADO, el módulo incorpora una pequeña carga de trabajo extra al servidor, por lo cual
 * siempre es importante balancear según el uso, cuánto se gana en compresión y cuánto se
 * consume extra en carga de procesos y memoria.
 * 
 * Habitualmente es mejor habilitarlo a nivel de endpoint o de algún área específica, por
 * ejemplo el servicio de contenidos estáticos en public, NO en toda la app.
 * 
 * Muchos servicios externos que podremos contratar para desplegar nuestra app, ya
 * integrarán esta funcionalidad de compresión en su sistema, sin que tengamos que habilitarla
 * manualmente en nuestro código.
 */

import express from 'express';
import compression from 'express-compression';

const app = express();

const server = app.listen(5000, () => {
    console.log('Server activo en puerto 5000');
});

/*
// Habilitación global, cualquier endpoint pasará a través de compression
app.use(compression());
*/

app.get('/ls1', (req, res) => {
    const text = 'Coder Comisión 55605 clase 32 compression ';
    let string = '';
    for (let i = 0; i < 10000; i++) string += text;
    res.status(200).send(string);
});

// Habilitación a nivel específico de endpoint
app.get('/ls2', compression({ brotli: { enabled: true, zlib: {}}}), (req, res) => {
    const text = 'Coder Comisión 55605 clase 32 compression ';
    let string = '';
    for (let i = 0; i < 10000; i++) string += text;
    res.status(200).send(string);
});