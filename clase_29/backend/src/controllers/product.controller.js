import Service from '../services/product.dao.js';

const service = new Service();

class ProductController {
    constructor() {
    }

    async getProducts() {
        try {
            return await service.getProducts();
        } catch (err) {
            return err.message
        }
        
    }

    async getProductById(id) {
        try {
            return await service.getProductById(id);
        } catch (err) {
            return err.message
        }
    }

    async addProduct(register) {
        try {
            return await service.addProduct(register);
        } catch (err) {
            return err.message
        }
    }
}

export default ProductController;