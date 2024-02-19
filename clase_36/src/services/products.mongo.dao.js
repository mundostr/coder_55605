import productModel from '../models/product.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class ProductService {
    constructor() {
    }

    async addProduct(product) {
        return await productModel.create(product);
    }

    async getProducts() {
        return await productModel.find().lean();
    }

    async getProduct(id) {
        return await productModel.findById(id);
    }

    async updateProduct(id, newContent) {
        return await productModel.findByIdAndUpdate(id, newContent);
    }

    async deleteProduct(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

export default ProductService;