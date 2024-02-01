import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import CustomError from "../services/error.custom.class.js";
import errorsDictionary from "../services/error.dictionary.js";

const router = Router();
const controller = new UserController();

router.get("/", async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.status(200).send({ status: "OK", data: users });
    } catch (err) {
        res.status(500).send({ status: "ERR", data: err.message });
    }
});

router.get("/paginated", async (req, res) => {
    try {
        const users = await controller.getUsersPaginated(req.query.page || 1, req.query.limit || 50);
        res.status(200).send({ status: "OK", data: users });
    } catch (err) {
        res.status(500).send({ status: "ERR", data: err.message });
    }
});

router.get("/mock/:qty([1-9]*)", async (req, res) => {
    try {
        const users = controller.generateMockUsers(req.params.qty);
        res.status(200).send({ status: "OK", data: users });
    } catch (err) {
        res.status(500).send({ status: "ERR", data: err.message });
    }
});

/**
 * Ruta de ejemplo para manejo centralizado de errores
 * Si todo va bien, procesamos la creación de usuario y retornamos la respuesta deseada.
 * Si hay problemas, retornamos una llamada a next() con una nueva instancia de nuestra
 * clase de error personalizada, esto será capturado por el middleware central de gestión
 * de errores en app.js.
 */
router.post("/", async (req, res, next) => {
    const { first_name, last_name, email, gender, password } = req.body;
    if (first_name && last_name && email && gender && password) {
        return res.status(200).send({ status: "OK", data: await controller.addUser(req.body) });
    }

    return next(new CustomError(errorsDictionary.FEW_PARAMETERS));
});

export default router;
