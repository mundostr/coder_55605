import productModel from '../models/product.model.js';

class ProductDTO {
    constructor(register) {
    }
}

class ProductService {
    constructor() {
    }

    async getProducts() {
        try {
            return await productModel.find().lean();
        } catch (err) {
            return err.message
        }
    }

    async getProductById(id) {
        try {
            return await productModel.find({ _id: id }).lean();
        } catch (err) {
            return err.message
        }
    }

    async addProduct(register) {
        try {
            return await productModel.create(register);
        } catch (err) {
            return err.message
        }
    }
}

export default ProductService;