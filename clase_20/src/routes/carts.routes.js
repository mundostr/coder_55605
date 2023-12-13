import { Router } from 'express'
import { CartController } from '../controllers/cart.controller.mdb.js'

const router = Router()
const controller = new CartController()

router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getCarts() })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router