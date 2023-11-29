import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.mdb.js'

const router = Router()
const controller = new ProductController()

router.get('/products', async (req, res) => {
    const products = await controller.getProducts()
    
    res.render('products', {
        title: 'Listado de PRODUCTOS',
        products: products
    })
})

export default router