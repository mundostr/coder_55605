import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import CustomError from "../services/error.custom.class.js";
import errorsDictionary from "../services/error.dictionary.js";
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';

const router = Router();
const controller = new UserController();

router.get("/", authToken, handlePolicies(['admin']), async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.status(200).send({ status: "OK", data: users });
    } catch (err) {
        res.status(500).send({ status: "ERR", data: err.message });
    }
});

router.get("/paginated", authToken, handlePolicies(['admin']), async (req, res) => {
    try {
        const users = await controller.getUsersPaginated(req.query.page || 1, req.query.limit || 50);
        res.status(200).send({ status: "OK", data: users });
    } catch (err) {
        res.status(500).send({ status: "ERR", data: err.message });
    }
});

router.post("/", authToken, handlePolicies(['admin']), async (req, res, next) => {
    const { first_name, last_name, email, gender, password } = req.body;
    
    if (first_name && last_name && email && gender && password) {
        return res.status(200).send({ status: "OK", data: await controller.addUser(req.body) });
    }

    return next(new CustomError({...errorsDictionary.FEW_PARAMETERS, moreInfo: 'first_name, last_name, email, gender, password'}));
});

export default router;
