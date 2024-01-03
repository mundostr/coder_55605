import { Router } from "express";
import { uploader } from "../uploader.js";
import { ProductController } from "../controllers/product.controller.mdb.js";

const router = Router();
const controller = new ProductController();

// http://localhost:8080/api/products?limit=50&page=2&sort=asc
router.get("/", async (req, res) => {
  try {
    const products = await controller.getProducts();
    res.status(200).send({ status: "OK", data: products });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

// router.get('/:pid([a-fA-F0-9]{24})', async (req, res) => {
router.get("/:pid", async (req, res) => {
  try {
    const product = await controller.getProduct(req.params.pid);
    res.status(200).send({ status: "OK", data: product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

/* router.get('*', async (req, res) => {
    res.status(404).send({ status: 'ERR', data: 'Endpoint no válido' })
}) */

router.post("/", uploader.single("thumbnail"), async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .send({ status: "FIL", data: "No se pudo subir el archivo" });

    const { title, description, price, code, stock } = req.body;
    if (!title || !description || !price || !code || !stock) {
      return res
        .status(400)
        .send({ status: "ERR", data: "Faltan campos obligatorios" });
    }

    const newContent = {
      title,
      description,
      price,
      // el obj req.file está disponible porque estamos utilizando Multer como middleware,
      // mediante el objeto uploader que estamos importando e inyectando.
      thumbnail: req.file.filename,
      code,
      stock,
    };

    const result = await controller.addProduct(newContent);

    // Si deseamos emitir algún evento de socket.io, primero necesitamos
    // obtener el objeto que seteamos en app.js y luego hacer un emit()
    const socketServer = req.app.get("socketServer");

    res.status(200).send({ status: "OK", data: result });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

router.put('/:pid', async (req, res) => {})

router.param('pid', async (req, res, next, pid) => {
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/)
    if (regex.test(req.params.pid)) {
        next();
    } else {
        res.status(404).send({ status: 'ERR', data: 'Parámetro no válido' })
    }
})

/**
 * Agregar aquí el resto de endpoints para completar el CRUD, realizando las llamadas
 * a los métodos correspondientes del controlador
 *
 * Recordar que tanto para PUT como para DELETE, se deberá pasar por req.params
 * el id correspondiente al documento que se desea operar.
 */

export default router;
