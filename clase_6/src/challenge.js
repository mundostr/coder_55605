/**
 * Se puede partir de esta plantilla para el desafío propuesto en el sincrónico.
 * 
 * La idea básicamente es importar la clase ProductManager que hemos venido armando en
 * desafíos anteriores, y llamar a sus métodos pero ahora desde los endpoints de Express,
 * para poder observar las respuestas desde el navegador en lugar de la terminal.
 */

import express from 'express'
// Importar el archivo de la clase ProductManager

// No hay problema en utilizar otro puerto si el 8080 está ocupado en la máquina por
// otro servicio, se puede cambiar por ej a 5000 o 3000.
const PORT = 8080

// Inicializamos nuestro servidor de express
// El agregado de urlencoded nos permitirá más adelante procesar mejor las solicitudes recibidas
const app = express()
app.use(express.urlencoded({ extended: true }))

// Atención!, recordar el agregado de async al callback, ya que estaremos llamando a métodos
// asíncronos de ProductManager.
app.get('/products', async (req, res) => {
    // Utilizar await para llamar al método getProducts() de la clase.
    // Una vez obtenidos los productos desde archivo, retornarlos en la respuesta como objeto
    // mediante res.send()

    // La actividad pide utilizar req.query, pasando un parámetro limit que indique
    // cuántos productos se desea recibir en la respuesta.
    // Recordar que si llamamos a este endpoint con la url http://localhost:8080/products?limit=10,
    // el valor 10 estará disponible acá como req.query.limit

    // Si no se pasa limit (req.query.limit undefined), se deben retornar TODOS los productos,
    // sino devolver solo la cantidad solicitada. Para esto se puede aprovechar el método
    // slice() sobre el array de productos recuperado desde el archivo.
})

// El challenge solicita también otra ruta, pero que utilice req.params
app.get('/products/:pid', async (req, res) => {
    // En este caso le pasamos al endpoint un id de producto con el nombre pid, podremos acceder
    // a la variable desde req.params.pid y luego realizar por ejemplo un find() sobre el array
    // de productos para encontrar el indicado y retornar solo ese objeto con res.send()
})

// Ponemos a "escuchar" el servidor en el puerto
app.listen(PORT, () => {
    console.log(`Servidor express activo en puerto ${PORT}`)
})