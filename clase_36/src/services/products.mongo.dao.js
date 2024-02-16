import productModel from '../models/product.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class ProductService {
    constructor() {
    }

    async addProduct(product) {
        const process = await productModel.create(product);
        return process === null ? 'No se pudo crear el producto' : 'Producto creado';
    }

    async getProducts() {
        return await productModel.find().lean();
    }

    async getProduct(id) {
        const product = await productModel.findById(id);
        return product === null ? 'No se encuentra el producto' : product;
    }

    async updateProduct(id, newContent) {
        return await productModel.findByIdAndUpdate(id, newContent);
    }

    async deleteProduct(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

export default ProductService;