import { Router } from 'express'

import { authToken } from '../utils.js'
import { ProductController } from '../controllers/product.controller.mdb.js'
import { UserController } from '../controllers/user.controller.mdb.js'

const router = Router()
const controller = new ProductController()
const userController = new UserController()

router.get('/products', async (req, res) => {
    if (req.session.user) {
        const products = await controller.getProducts()
        
        res.render('products', {
            title: 'Listado de PRODUCTOS',
            products: products
        })
    } else {
        res.redirect('/login')
    }
})

router.get('/users', async (req, res) => {
    if (req.session.user && req.session.user.role.toUpperCase() === 'ADMIN') {
        const data = await userController.getUsersPaginated(req.query.page || 1, req.query.limit || 50)
        
        // Handlebars tiene algunas limitaciones al momento de evaluar expresiones.
        // Si queremos un listado completo de enlaces de página, armamos directamente un array
        // para recorrer y tener el número de página en cada caso (ver opción 1 paginado en plantilla)
        data.pages = []
        for (let i = 1; i <= data.totalPages; i++) data.pages.push(i)

        res.render('users', {
            title: 'Listado de USUARIOS',
            data: data
        })
    } else if (req.session.user) {
        res.redirect('/profile')
    } else {
        res.redirect('/login')
    }
})

router.get('/cookies', async (req, res) => {
    res.render('cookies', {})
})

router.get('/login', async (req, res) => {
    if (req.session.user) {
        res.redirect('/profile')
    } else {
        res.render('login', { msg: req.query.msg || null })
    }
})

router.get('/profile', async (req, res) => {
    if (req.session.user) {
        res.render('profile', { login_type: 'session', user: req.session.user })
    } else {
        res.redirect('/login')
    }
})

router.get('/profilejwt', authToken, async (req, res) => {
    res.render('profile', { login_type: 'jwt', user: req.user })
})

router.get('/register', async (req, res) => {
    res.render('register', {})
})

router.get('/restore', async (req, res) => {
    if (req.session.user) {
        res.redirect('/profile')
    } else {
        res.render('restore', {})
    }
})

export default router