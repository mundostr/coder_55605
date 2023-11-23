/**
 * Este es un modelo de Mongoose, que nos permite "describir"
 * la organización de una colección en la base de datos
*/

import mongoose from 'mongoose'

// Importante agregar esta línea para no tener problemas
// con algunas configuraciones predeterminadas de Mongoose
mongoose.pluralize(null)

// En este caso la colección se llama students y tiene el esquema indicado debajo
const collection = 'students'
const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    dni: { type: String, required: true },
    course: { type: String, required: true },
    qualification: { type: Number, required: true }
    // gender: { type: String, enum: ['F', 'M'], default: 'F'},
});

// Creamos y exportamos un modelo en base al esquema descripto.
// Toda interacción con el motor de base de datos, se hará a través de este modelo
const studentModel = mongoose.model(collection, schema)

export default studentModel