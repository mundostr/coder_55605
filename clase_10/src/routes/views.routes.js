import { Router } from 'express'

const router = Router()

const users = [
    { firstName: 'Carlos', lastName: 'Perren', age: 48, email: 'cperren@gmail.com', phone: '+5493492222333', role: 'admin' },
    { firstName: 'Carolina', lastName: 'Ferrero', age: 42, email: 'cferrero@gmail.com', phone: '+5493492222334', role: 'user' },
    { firstName: 'Juan', lastName: 'Perez', age: 30, email: 'jperez@gmail.com', phone: '+5493492222335', role: 'user' }
]

const food = [
    { name: 'Banana', price: 500 },
    { name: 'Manzana', price: 350 },
    { name: 'Naranja', price: 550 }
]

router.get('/', (req, res) => {
    const random = Math.floor(Math.random() * users.length - 1) + 1
    res.render('index', {
        title: 'Coder Compras Index',
        user: users[random],
        food: food,
        isAdmin: users[random].role === 'admin'
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Coder Compras Registro'
    })
})

// Agregamos una nueva ruta /chat, para una página HTML que nos servirá de prueba
// como cliente Websockets
router.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Coder Compras Chat'
    })
})

export default router