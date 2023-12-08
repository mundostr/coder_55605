import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.mdb.js'
import { UserController } from '../controllers/user.controller.mdb.js'

const router = Router()
const controller = new ProductController()
const userController = new UserController()

// Dejamos esta ruta como PUBLICA, cualquier usuario logueado puede verla
router.get('/products', async (req, res) => {
    // Verificamos si hay un usuario logueado
    if (req.session.user) {
        const products = await controller.getProducts()
        
        res.render('products', {
            title: 'Listado de PRODUCTOS',
            products: products
        })
    } else {
        // Sino redireccionamos al login
        res.redirect('/login')
    }
})

// Dejamos esta ruta como PRIVADA, solo los usuarios admin pueden verla
router.get('/users', async (req, res) => {
    // Si hay un usuario logueado y es admin
    if (req.session.user && req.session.user.admin === true) {
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
        // Si hay un usuario logueado pero no es admin
        res.redirect('/profile')
    } else {
        // caso contrario volvemos al login
        res.redirect('/login')
    }
})

// Activamos endpoints para renderizar las plantillas de prueba.
// Observar que el objeto de parámetros está vacío, no necesitamos pasar datos por el momento.
router.get('/cookies', async (req, res) => {
    res.render('cookies', {})
})

router.get('/login', async (req, res) => {
    // Si el usuario tiene sesión activa, no volvemos a mostrar el login,
    // directamente redireccionamos al perfil.
    if (req.session.user) {
        res.redirect('/profile')
    } else {
        res.render('login', {})
    }
})

router.get('/profile', async (req, res) => {
    // Si el usuario tiene sesión activa, mostramos su perfil
    if (req.session.user) {
        res.render('profile', { user: req.session.user })
    } else {
        // sino volvemos al login
        res.redirect('/login')
    }
})

router.get('/register', async (req, res) => {
    res.render('register', {})
})

export default router