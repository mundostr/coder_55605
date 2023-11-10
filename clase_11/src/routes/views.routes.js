import { Router } from 'express'

const router = Router()

// Solo habilitamos un endpoint /chat para probar el chat websockets
router.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Coder Compras Chat'
    })
})

export default router