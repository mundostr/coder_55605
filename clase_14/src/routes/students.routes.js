import { Router } from 'express'
// Importamos el modelo, a través de él realizaremos las consultas a la colección
import studentModel from '../models/students.model.js'

// TODOS los endpoints son asíncronos, recordar!
const router = Router()

router.get('/', async (req, res) => {
    // Aplicamos el método find() del modelo (sin criterios)
    // para recuperar todos los datos de la colección
    const students = await studentModel.find()
    res.status(200).send({ status: 'OK', data: students })
})

router.post('/', async (req, res) => {
    // Desestructuramos el req.body
    const { firstName, lastName, age, dni, course, qualification } = req.body
    if (!firstName || !lastName || !age || !dni || !course || !qualification) {
        return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' })
    }

    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        dni: dni,
        course: course,
        qualification: qualification
    }

    // Generamos un nuevo objeto de estudiante, en base a los datos del req.body,
    // y aplicamos el método create() para insertar un nuevo documento en la colección
    const result = await studentModel.create(newStudent)
    res.status(200).send({ status: 'OK', data: result })
})

router.put('/:uid', async (req, res) => {
    // Desestructuramos el req.params y el req.body
    const { uid } = req.params
    const { firstName, lastName, age, dni, course, qualification } = req.body
    if (!firstName || !lastName || !age || !dni || !course || !qualification) {
        return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' })
    }

    // Ahora aplicamos el método updateOne(), pasándole como primer argumento
    // un objeto con el criterio necesario (ubicamos el documento por _id).
    // El segundo argumento es el nuevo contenido
    const result = await studentModel.updateOne({ _id: uid }, req.body)
    res.status(200).send({ status: 'OK', data: result })
})

router.delete('/:uid', async (req, res) => {
    // Desestructuramos el req.params
    const { uid } = req.params
    
    // Aplicamos el método deleteOne(), pasándole el _id del documento a borrar
    const result = await studentModel.deleteOne({ _id: uid })
    res.status(200).send({ status: 'OK', data: result })
})

export default router