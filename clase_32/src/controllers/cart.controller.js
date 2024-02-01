/**
 * Creamos un servicio DAO para Mongo en un archivo por separado.
 * Ahora acá en el controlador, solo instanciamos el servicio y llamamos a los métodos
 * 
 * Podemos cargar manualmente el DAO que necesitemos (Mongo o Mysql en este ejemplo),
 * o bien hacerlo automáticamente a través de un Factory.
 */

// import CartService from '../services/carts.mongo.dao.js';
// import CartService from '../services/carts.mysql.dao.js';
import FactoryCartService from '../services/dao.factory.js';

// const service = new CartService();
const service = new FactoryCartService();

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
}