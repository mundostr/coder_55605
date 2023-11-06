import { Router } from 'express'
import { uploader } from '../uploader.js'

const router = Router()
const pets = []

router.get('/', (req, res) => {
    res.status(200).send({ err: 'OK', data: pets })
})

router.post('/', uploader.single('avatar'), (req, res) => {
    // Acá luego se debería controlar el contenido del body
    const newPet = req.body
    pets.push(newPet)
    res.status(200).send({ err: 'OK', data: newPet })
})

export default router