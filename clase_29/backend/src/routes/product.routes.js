import { Router } from 'express';
import Controller from '../controllers/product.controller.js';

const router = Router();
const controller = new Controller();

router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getProducts() });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/one/:id', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getProductById(req.params.id) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const register = {};
        res.status(200).send({ status: 'OK', data: await controller.addProduct(register) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router