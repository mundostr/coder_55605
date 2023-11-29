import mongoose from 'mongoose'
// Atención!, si se usa populate en este módulo, no olvidar importar el/los
// modelos adicionales necesarios
import productModel from '../models/product.model.js'

mongoose.pluralize(null)

const collection = 'carts'

// El atributo ref nos permite indicar que el campo se "enlazará" con otra colección
const schema = new mongoose.Schema({
    products: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'products' }, // ref a la colección
    total: { type: Number, required: true }
})

// Este middleware nos permite interceptar cualquier llamada a find() y ejecutar
// sobre ella un populate. En el ejemplo, estamos haciendo populate (completando)
// el array products con datos que vienen desde la colección products a través
// del modelo productModel.
// Se puede utilizar el middleware aquí, o directamente hacer el populate a mano
// al momento de llamar al método find()
schema.pre('find', function() {
    this.populate({ path: 'products', model: productModel });
})

export default mongoose.model(collection, schema)