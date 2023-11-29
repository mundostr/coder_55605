import { Router } from 'express'
import { CartController } from '../controllers/cart.controller.mdb.js'

const router = Router()
const controller = new CartController()

// Habilitamos solo el endpoint para getCarts(), a efectos de probar
// populate de Mongoose, completar el resto del CRUD como práctica
router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getCarts() })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router