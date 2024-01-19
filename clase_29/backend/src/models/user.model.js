import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'users_with_pass';

const schema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
});

export default mongoose.model(collection, schema);