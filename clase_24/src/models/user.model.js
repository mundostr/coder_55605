import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

mongoose.pluralize(null)

// Atención!!!, verificar que el nombre de la colección sea el correcto.
const collection = 'users_with_pass'

const schema = new mongoose.Schema({
    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId },
    role: { type: String, default: 'user' }
});

// Importamos mongoose-paginate-v2 y lo activamos como plugin, para tener disponible
// el método paginate() en las consultas
schema.plugin(mongoosePaginate)

export default mongoose.model(collection, schema)