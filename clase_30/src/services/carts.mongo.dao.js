import cartModel from '../models/cart.model.js';

class CartService {
    constructor() {
    }

    async getCarts() {
        try {
            // Ya no realizamos consultas en el controlador, delegamos a este
            // DAO que se encarga de hacerlas mediante los métodos de Mongoose
            return await cartModel.find().lean();
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