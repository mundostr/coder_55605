/**
 * Este es nuestro primer servidor NodeJS!
 * 
 * Utilizando el módulo nativo http, creamos un servidor que "escucha" en
 * el puerto 8080, y responde con un saludo a cualquier solicitud
 */

import http from 'http'

// Creamos instancia del servidor y le pasamos un callback con la respuesta que debe retornar
const app = http.createServer((req, res) => {
    res.end('Hola desde el backend en la maquina local')
})

// Lo ponemos a escuchar en el puerto 8080
app.listen(8080, () => {
    console.log('Primer BACKEND activo en el puerto 8080')
})