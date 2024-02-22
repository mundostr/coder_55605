import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.pluralize(null);

const collection = 'tickets';

const schema = new mongoose.Schema({
    code: { type: String, default: () => bcrypt.genSaltSync(8) },
    purchase_datetime: { type: Date, default: new Date().toISOString() },
    amount: { type: Number, default: 0 },
    purchaser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users_with_pass' },
});

export default mongoose.model(collection, schema);