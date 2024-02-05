import ProductService from '../services/products.mongo.dao.js';

const productService = new ProductService();

class ProductDTO {
    constructor(product) {
        this.product = product;
        this.product.title = this.product.title.toUpperCase();
    }
}

export class ProductController {
    constructor() {
    }

    async addProduct(product) {
        try {
            const normalizedProduct = new ProductDTO(product);
            return await productService.addProduct(normalizedProduct);
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
            return await productService.deleteProduct(id);
        } catch (err) {
            return err.message
        }
    }
}