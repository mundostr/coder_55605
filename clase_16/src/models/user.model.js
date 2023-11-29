import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'users'

// con index: true, podemos habilitar la creación de un índice en cualquiera
// de los campos del esquema, lo cual permitirá agilizar las búsquedas
// CUIDADO!!!, no habilitar índices en todos los campos, analizar las consultas
// que se harán y decidir dónde conviene activarlos
const schema = new mongoose.Schema({
    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
});

export default mongoose.model(collection, schema)