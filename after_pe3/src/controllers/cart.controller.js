import CartService from '../services/carts.mongo.dao.js';

const service = new CartService();

export class CartController {
    constructor() {
    }

    async getCarts() {
        try {
            return await service.getCarts();
        } catch (err) {
            return err.message
        }
    }

    async getTopCart() {
        try {
            return await service.getTopCart();
        } catch (err) {
            return err.message
        }
    }

    async processPurchase(id) {
        try {
            const cartData = await service.getCartById(id);
            return cartData;

            // Recuperar datos de ese carrito, deberían tener también gracias al populate
            // el stock actualizado de cada producto en el array products del carrito.
            // Verificar stock producto x producto del array
            // Generar ticket (2)
            // Actualizar carrito
            // Agendar actualizaciones de stock en colección productos
        } catch (err) {
            return err.message
        }
    }
}