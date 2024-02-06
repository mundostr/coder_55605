import { Router } from "express";
import { uploader } from "../uploader.js";
import { ProductController } from "../controllers/product.controller.js";
import CustomError from "../services/error.custom.class.js";
import errorsDictionary from "../services/error.dictionary.js";
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';
import { catcher } from '../utils.js';

const router = Router();
const controller = new ProductController();

router.get("/", authToken, catcher(async (req, res) => {
    res.status(200).send({ status: "OK", data: await controller.getProducts() });
}));

router.get("/one/:pid", authToken, catcher(async (req, res) => {
    res.status(200).send({ status: "OK", data: await controller.getProduct(req.params.pid) });
}));

router.post("/", authToken, handlePolicies(['admin']), uploader.single("thumbnail"), catcher(async (req, res) => {
    if (!req.file) throw new CustomError(errorsDictionary.UPLOAD_FILE_ERROR);

    const { title, description, price, code, stock } = req.body;

    if (title && description && price && code && stock) {
        const newContent = { title, description, price, thumbnail: req.file.filename, code, stock };
        return res.status(200).send({ status: "OK", data: await controller.addProduct(newContent) });
    }

    throw new CustomError({...errorsDictionary.FEW_PARAMETERS, moreInfo: 'title, description, price, code, stock'});
}));

router.put("/:pid", authToken, handlePolicies(['admin']), catcher(async (req, res) => {}));

router.delete("/:pid", authToken, handlePolicies(['admin']), catcher(async (req, res) => {}));

router.param("pid", async (req, res, next, pid) => {
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/);
    if (regex.test(req.params.pid)) {
        next();
    } else {
      return next(new CustomError(errorsDictionary.INVALID_MONGOID_FORMAT));
    }
});

export default router;