import mongoose from 'mongoose';
/* import productModel from '../models/product.model.js'; */

mongoose.pluralize(null);

const collection = 'carts';

const schema = new mongoose.Schema({
    products: { type: [ { pid: mongoose.Schema.Types.ObjectId, qty: Number } ], ref: 'products' },
    total: { type: Number, required: true }
})

/* schema.pre('find', function() {
    this.populate({ path: 'products.pid', model: productModel });
}) */

export default mongoose.model(collection, schema);