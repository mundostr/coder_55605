import { Router } from 'express'
import { uploader } from '../uploader.js'
import { ProductController } from '../controllers/product.controller.mdb.js'

const router = Router()
const controller = new ProductController()

router.get('/', async (req, res) => {
    const products = await controller.getProducts()
    res.status(200).send({ status: 'OK', data: products })
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    if (!req.file) return res.status(400).send({ status: 'FIL', data: 'No se pudo subir el archivo' })

    const { title, description, price, code, stock } = req.body
    if (!title || !description || !price || !code || !stock) {
        return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' })
    }

    const newContent = {
        title,
        description,
        price,
        // el obj req.file está disponible porque estamos utilizando Multer como middleware,
        // mediante el objeto uploader que estamos importando e inyectando.
        thumbnail: req.file.filename,
        code,
        stock
    }

    const result = await controller.addProduct(newContent)
    res.status(200).send({ status: 'OK', data: result })
})

/**
 * Agregar aquí el resto de endpoints para completar el CRUD, realizando las llamadas
 * a los métodos correspondientes del controlador
 *
 * Recordar que tanto para PUT como para DELETE, se deberá pasar por req.params
 * el id correspondiente al documento que se desea operar.
*/

export default router