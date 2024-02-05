import cartModel from '../models/cart.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class CartService {
    constructor() {
    }

    async getCarts() {
        try {
            return await cartModel.find().lean();
        } catch (err) {
            return err.message
        }
    }

    async getCartById(id) {
        try {
            return await cartModel.findById(id);
        } catch (err) {
            return err.message
        }
    }
    
    async getTopCart() {
        try {
            return await cartModel.find().sort({ total: -1 }).limit(1).lean()
        } catch (err) {
            return err.message
        }
    }
}

export default CartService;