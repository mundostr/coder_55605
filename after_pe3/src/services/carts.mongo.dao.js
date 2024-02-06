import cartModel from '../models/cart.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class CartService {
    constructor() {
    }

    async getCarts() {
        return await cartModel.find().lean();
    }

    async getCartById(id) {
        return await cartModel.findById(id);
    }
    
    async getTopCart() {
        return await cartModel.find().sort({ total: -1 }).limit(1).lean()
    }
}

export default CartService;