import productModel from '../models/product.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class ProductService {
    constructor() {
    }

    async addProduct(product) {
        try {
            const process = await productModel.create(product);
            return process === null ? 'No se pudo crear el producto' : 'Producto creado';
        } catch (err) {
            return err.message;
        }
    }

    async getProducts() {
        try {
            return await productModel.find().lean();
        } catch (err) {
            return err.message;
        }
        
    }

    async getProduct(id) {
        try {
            const product = await productModel.findById(id);
            return product === null ? 'No se encuentra el producto' : product;
        } catch (err) {
            return err.message;
        }
    }

    async updateProduct(id, newContent) {
        try {
            return await productModel.findByIdAndUpdate(id, newContent);
        } catch (err) {
            return err.message;
        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (err) {
            return err.message;
        }
    }
}

export default ProductService;