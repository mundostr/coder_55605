import { Router } from 'express'
import { uploader } from '../uploader.js'

const router = Router()
const users = []

const report = (req, res, next) => {
    console.log(`Ahora: ${new Date().toLocaleString()}`)
    next()
}

/* router.use((req, res, next) => {
    console.log(`Ahora: ${new Date().toLocaleString()}`)
    next()
}) */

router.get('/', (req, res) => {
    res.status(200).send({ err: 'OK', data: users })
})

// router.post('/', report, (req, res) => {
router.post('/', uploader.single('avatar'), (req, res) => {
    // Hubo un problema en el proceso de carga
    if (!req.file) return res.status(400).send({ err: 'FIL', msg: 'No se pudo subir el archivo' })

    // Acá luego se debería controlar el contenido del body
    const newUser = req.body
    users.push(newUser)
    res.status(200).send({ err: 'OK', data: newUser })
})

export default router