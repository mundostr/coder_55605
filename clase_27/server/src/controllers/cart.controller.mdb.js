import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'

export class CartController {
    constructor() {
    }

    async getCarts() {
        try {
            return await cartModel.find().lean()
            // path: elemento a completar
            // return await cartModel.find().populate({ path: 'products', model: productModel }).lean();
        } catch (err) {
            return err.message
        }
    }

    async getTopCart() {
        try {
            return await cartModel.find().sort({ total: -1 }).limit(1).lean()
            // path: elemento a completar
            // return await cartModel.find().populate({ path: 'products', model: productModel }).lean();
        } catch (err) {
            return err.message
        }
    }
}