import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { ProductController } from '../controllers/product.controller.js';
import authToken from '../auth/custom.jwt.auth.js';
import handlePolicies from '../auth/policies.auth.js';
import { catcher } from '../utils.js';

const router = Router();
const controller = new ProductController();
const userController = new UserController();

router.get('/products', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    const products = await controller.getProducts();
    res.render('products', { title: 'Listado de PRODUCTOS', products: products });
}));

router.get('/users', authToken, handlePolicies(['admin']), catcher(async (req, res) => {
    const data = await userController.getUsersPaginated(req.query.page || 1, req.query.limit || 50);

    data.pages = [];
    for (let i = 1; i <= data.totalPages; i++) data.pages.push(i);
    res.render('users', { title: 'Listado de USUARIOS', data: data });
}));

router.get('/login', async (req, res) => {
    res.render('login', { msg: req.query.msg || null });
});

router.get('/profile', authToken, async (req, res) => {
    res.render('profile', { login_type: 'jwt', user: req.user });
})

router.get('/register', async (req, res) => {
    res.render('register', {});
})

router.get('/restore', async (req, res) => {
    res.render('restore', {});
})

export default router;