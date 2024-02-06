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
        const normalizedProduct = new ProductDTO(product);
        return await productService.addProduct(normalizedProduct);
    }

    async getProducts() {
        return await productService.getProducts();
    }

    async getProduct(id) {
        return await productService.getProduct(id);
    }

    async updateProduct(id, newContent) {
        return await productService.updateProduct(id, newContent);
    }

    async deleteProduct(id) {
        return await productService.deleteProduct(id);
    }
}