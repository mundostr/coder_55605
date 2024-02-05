import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';

const router = Router();
const controller = new CartController();

router.get('/', authToken, handlePolicies(['admin']), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'await controller.getCarts()' });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
})

router.get('/top', authToken, handlePolicies(['admin']), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.getTopCart() })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.get('/:cid/purchase', authToken, handlePolicies(['premium', 'user']), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.processPurchase(req.params.cid) })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router;