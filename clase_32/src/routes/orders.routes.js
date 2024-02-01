import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';

const router = Router();
const controller = new OrderController();

router.get('/:type', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getOrders(req.params.type) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
})

export default router;