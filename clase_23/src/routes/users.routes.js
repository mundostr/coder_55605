import { Router } from 'express'
import { UserController } from '../controllers/user.controller.mdb.js'

const router = Router()
const controller = new UserController()

router.get('/', async (req, res) => {
    try {
        const users = await controller.getUsers()
        res.status(200).send({ status: 'OK', data: users })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

// Podemos modificar el método getUsersPaginated() del controlador
// para recibir parámetros que obtengamos aquí mediante req.params o req.query
// http://localhost:5000/api/users/paginated?limit=100&page=2&sort=desc
router.get('/paginated', async (req, res) => {
    try {
        const users = await controller.getUsersPaginated()
        res.status(200).send({ status: 'OK', data: users })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router