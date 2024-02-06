import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';
import { catcher } from '../utils.js';

const router = Router();
const controller = new CartController();

router.get('/', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: await controller.getCarts() });
}));

router.get('/top', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: await controller.getTopCart() });
}));

router.get('/:cid/purchase', authToken, handlePolicies(['premium', 'user']), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: await controller.processPurchase(req.params.cid) })
}));

export default router;