import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import CustomError from "../services/error.custom.class.js";
import errorsDictionary from "../services/error.dictionary.js";
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';
import { catcher } from '../utils.js';

const router = Router();
const controller = new UserController();

router.get("/", authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    req.logger.warn('Este es un alerta que debe bajarse a archivo');
    res.status(200).send({ status: "OK", data: await controller.getUsers() });
}));

// Endpoints para prueba de Artillery, BORRAR luego
router.get("/simple", catcher(async (req, res) => {
    let total = 0;
    for (let i = 0; i < 100000; i++) total += i;
    res.status(200).send({ status: "OK", data: total });
}));

router.get("/complex", catcher(async (req, res) => {
    let total = 0;
    for (let i = 0; i < 5e8; i++) total += i;
    res.status(200).send({ status: "OK", data: total });
}));

router.get("/paginated", authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    res.status(200).send({ status: "OK", data: await controller.getUsersPaginated(req.query.page || 1, req.query.limit || 50) });
}));

router.post("/", authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    const { first_name, last_name, email, gender, password } = req.body;
    
    if (first_name && last_name && email && gender && password) {
        return res.status(200).send({ status: "OK", data: await controller.addUser(req.body) });
    }

    throw new CustomError({...errorsDictionary.FEW_PARAMETERS, moreInfo: 'first_name, last_name, email, gender, password'});
}));

export default router;