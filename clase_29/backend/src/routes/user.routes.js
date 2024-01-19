import { Router } from 'express';
import Controller from '../controllers/user.controller.js';

const router = Router();
const controller = new Controller();

router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getUsers() });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/one/:id', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getUserById(req.params.id) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const register = {};
        res.status(200).send({ status: 'OK', data: await controller.addUser(register) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router