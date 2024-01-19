import mongoose from 'mongoose';
import userModel from '../models/user.model.js';
import productModel from '../models/product.model.js';

mongoose.pluralize(null);

const collection = 'orders_class_29';

const schema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users_with_pass', required: true },
    products: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'products', required: true },
    total: { type: Number, required: true },
    delivered: { type: Boolean, default: false }
})

schema.pre('find', function() {
    this.populate({ path: 'user_id', model: userModel });
    this.populate({ path: 'products', model: productModel });
})

export default mongoose.model(collection, schema);