import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class CartService {
    constructor() {
    }

    async getCarts() {
        return await cartModel.find().lean();
    }

    async getCartById(id) {
        return await cartModel.findById(id).populate({ path: 'products.pid', model: productModel });
    }

    async updateCart(cid, pid, qty) {
        // Intentamos actualizar el array products
        let update = await cartModel.findOneAndUpdate(
            { _id: cid, 'products.pid': pid },
            { $set: { 'products.$.qty': qty } },
            { new: true }
        );

        // Si el producto no existe aún en el array, lo agregamos
        if (update === null) {
            update = await cartModel.findOneAndUpdate(
                { _id: cid },
                { $push: { products: { pid: pid, qty: qty } } },
                { new: true }
            );
        }

        return update;
    }
}

export default CartService;