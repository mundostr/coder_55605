import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.mdb.js'
import { UserController } from '../controllers/user.controller.mdb.js'

const router = Router()
const controller = new ProductController()
const userController = new UserController()

router.get('/products', async (req, res) => {
    // Por supuesto, al igual que en endpoints de API,
    // podemos instanciar el controlador y utilizar sus métodos
    const products = await controller.getProducts()
    
    res.render('products', {
        title: 'Listado de PRODUCTOS',
        products: products
    })
})

router.get('/users', async (req, res) => {
    // Por supuesto, podemos utilizar parámetros también (req.params o req.query)
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
})

export default router