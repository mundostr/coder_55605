import { Router } from 'express';
import Controller from '../controllers/order.controller.js';
import { checkRequiredFields } from '../utils.js';

const router = Router();
const controller = new Controller();

router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getOrders() });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/one/:id', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getOrderById(req.params.id) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/', checkRequiredFields(['user_id', 'products', 'total']), async (req, res) => {
    try {
        const { user_id, products, total, delivered } = req.body;
        res.status(200).send({ status: 'OK', data: await controller.addOrder({ user_id, products, total, delivered }) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router