import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'

export class CartController {
    constructor() {
    }

    async getCarts() {
        try {
            // path: elemento a completar
            return await cartModel.find().lean()
            // return await cartModel.find().populate({ path: 'products', model: productModel }).lean();
        } catch (err) {
            return err.message
        }
        
    }
}