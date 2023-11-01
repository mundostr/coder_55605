import { Router } from 'express'
// Importamos la utilidad uploader que hemos creado con Multer,
// para manejar la carga de archivos
import { uploader } from '../uploader.js'

const router = Router()

const pets = []

router.get('/', (req, res) => {
    res.status(200).send({ data: pets })
})

// Ejemplo de uso de uploader como middleware, lo "inyectamos" en este endpoint,
// con lo cual al recibir una solicitud, se encargará de la parte de archivos,
// mientras los contenidos de texto serán procesados luego por el callback den endpoint
router.post('/', uploader.single('avatar'), (req, res) => {
    // Deberíamos controlar lo que llega en el req.body
    const newContent = req.body
    pets.push(newContent)
    res.status(200).send({ data: newContent })
})

export default router