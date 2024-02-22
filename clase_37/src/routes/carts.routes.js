import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';
import CustomError from "../services/error.custom.class.js";
import errorsDictionary from "../services/error.dictionary.js";
import { requiredFieldsInBody } from '../utils.js';
import { catcher } from '../utils.js';

const router = Router();
const controller = new CartController();

router.get('/', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: await controller.getCarts() });
}));

router.get('/one/:cid', authToken, catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: await controller.getCart(req.params.cid) });
}));

router.get('/:cid/purchase', authToken, catcher(async (req, res) => {
    // res.status(200).send({ status: 'OK', data: await controller.processPurchase(req.params.cid, req.user._id) })
    res.status(200).send({ status: 'OK', data: await controller.processPurchase(req.params.cid) })
}));

router.get('/tickets', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    res.status(200).send({ status: 'OK', data: await controller.getTickets() });
}));

router.patch('/:cid', authToken, requiredFieldsInBody(['pid', 'qty'], 'pid: id producto, qty: cantidad'), catcher(async (req, res) => {
    const { pid, qty } = req.body;
    if (qty > 0) {
        res.status(200).send({ status: 'OK', data: await controller.updateCart(req.params.cid, pid, qty) });
    } else {
        throw new CustomError({ ...errorsDictionary.INVALID_PARAMETER, moreInfo: 'cantidad negativa' });
    }
}));

router.param("cid", async (req, res, next) => {
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/);
    
    if (regex.test(req.params.cid)) {
        next();
    } else {
      return next(new CustomError(errorsDictionary.INVALID_MONGOID_FORMAT));
    }
});

export default router;