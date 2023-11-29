import { Router } from 'express'
import { UserController } from '../controllers/user.controller.mdb.js'

const router = Router()
const controller = new UserController()

// Habilitamos solo el endpoint para getUsers(), a efectos de probar
// índices de Mongoose, completar el resto del CRUD como práctica
router.get('/', async (req, res) => {
    try {
        const users = await controller.getUsers()
        res.status(200).send({ status: 'OK', data: users })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router