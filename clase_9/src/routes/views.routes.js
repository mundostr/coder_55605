import { Router } from 'express'

const router = Router()

const users = [
    {
      firstName: "Juan",
      lastName: "Pérez",
      age: 30,
      email: "juan@example.com",
      phone: "123-456-7890",
      role: 'admin'
    },
    {
      firstName: "María",
      lastName: "Gómez",
      age: 25,
      email: "maria@example.com",
      phone: "987-654-3210",
      role: 'user'
    },
    {
      firstName: "Luis",
      lastName: "Martínez",
      age: 35,
      email: "luis@example.com",
      phone: "555-123-4567",
      role: 'user'
    },
    {
      firstName: "Ana",
      lastName: "Rodríguez",
      age: 28,
      email: "ana@example.com",
      phone: "444-789-1234",
      role: 'user'
    },
    {
      firstName: "Carlos",
      lastName: "López",
      age: 40,
      email: "carlos@example.com",
      phone: "777-888-9999",
      role: 'user'
    },
]

const foods = [
    { name: 'Banana', price: 700 },
    { name: 'Manzana', price: 650 },
    { name: 'Naranja', price: 750 },
]

// Luego de habilitar Handlebars en app.js, dispondremos de un método render
// en el objeto res,para servir plantillas, pasándoles un objeto con los datos
// dinámicos que el motor debe reemplazar en el html de la plantilla.
router.get('/', (req, res) => {
    const random = Math.floor(Math.random() * users.length)
    
    res.render('index', {
        user: users[random],
        foods: foods,
        isAdmin: users[random].role === 'admin'
    })
})

router.get('/register', (req, res) => {
  res.render('register', {})
})

export default router