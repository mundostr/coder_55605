/**
 * Creamos un servicio DAO para Mongo en un archivo por separado.
 * Ahora acá en el controlador, solo instanciamos el servicio y llamamos a los métodos
 */

import { ProductService } from '../services/products.mongo.dao.js';

const productService = new ProductService();

export class ProductController {
    constructor() {
    }

    async addProduct(product) {
        try {
            return await productService.addProduct(product);
        } catch (err) {
            return err.message
        }
    }

    async getProducts() {
        try {
            return await productService.getProducts();
        } catch (err) {
            return err.message
        }
        
    }

    async getProduct(id) {
        try {
            return await productService.getProduct(id);
        } catch (err) {
            return err.message
        }
    }

    async updateProduct(id, newContent) {
        try {
            return await productService.updateProduct(id, newContent);
        } catch (err) {
            return err.message
        }
    }

    async deleteProduct(id) {
        try {
            return await productService.findByIdAndDelete(id);
        } catch (err) {
            return err.message
        }
    }
}