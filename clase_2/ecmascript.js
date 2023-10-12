<<<<<<< HEAD
/* const valor = 2
const potencia = 5

console.log(valor ** potencia) */

// Método includes arrays
/* const nombreBuscado = 'Jorge'
const nombres = ['Carlos', 'Carolina', 'Jorge', 'Pepe', 'Florencia'] */

/* for (let i = 0; i < nombres.length; i++) {
    if (nombres[i] === nombreBuscado) {
        console.log('La persona se encuentra')
    }
} */

/* if (nombres.includes(nombreBuscado)) {
    console.log('El nombre está incluído')
} else {
    console.log('El nombre NO está incluído')
} */

/* const datosPersonales = {
    nombre: 'Carlos',
    apellido: 'Perren',
    edad: 48,
    saldo: 1000.15,
    activo: true
}

console.log(Object.values(datosPersonales)) */

/* const config = {
    PUERTO: 0
} */

// Operador Nullish
// const puerto1 = config.PUERTO ?? 3000 // si es null o undefined

// Operador doble pipe
// const puerto1 = config.PUERTO || 3000 // si es null o undefined, 0, ''

// console.log(puerto1)

// Método reduce arrays
/* const cobranzas = [222, 301, 100, 12, 1010]

const total = cobranzas.reduce((prev, actual) => {
    return prev = prev + actual
    // return prev += actual
})
console.log(total) */

// Operador spread (...)

// const datosPersonales = { apellido: "Perren", nombre: "Carlos", edad: 48 }

// Desestructuración de objetos
/* const datosCompletos = {
    ...datosPersonales, // desestructurando
    suscripcion: 'premium',
    saldo: 10250.23
}

console.log(datosCompletos) */

// spread: cantidad variable de argumentos
/* const sumar = (...numeros) => {
=======
// Operador spread (...)
// Simple objeto con datos personales
const datosPersonales = {
    nombre: 'Pepe',
    apellido: 'Acosta',
    edad: 30
}

// spread = desestructuración de arrays y objetos
// El operadore spread nos permite extraer los elementos de datosPersonales,
// para reutilizarlos en la declaración de un nuevo objeto
const datosCompletos = {
    ...datosPersonales,
    suscripcion: 'premium',
    saldo: 1080.20
}
// console.log(datosCompletos)

// Otro aspecto muy útil de spread es como asignador variable de argumentos,
// de esta forma, suma puede procesar distintas cantidades de números recibidos.
const sumar = (...numeros) => {
>>>>>>> clase_2
    let suma = 0
    for (let nro of numeros) suma += nro
    return suma
}
<<<<<<< HEAD

console.log(sumar(2, 3, 3, 3)) */

/* const pedidos = [
  { manzanas: 3, peras: 2, carne: 1, jugos: 5, dulces: 3 },
  { manzanas: 1, sandias: 1, huevos: 6, jugos: 1, panes: 4 },
] */


const cadenaRecibida = '   COderHouSe    '
const cadenaNormalizada = cadenaRecibida.trim().toUpperCase()

console.log(cadenaRecibida)
console.log(cadenaRecibida.length)

console.log(cadenaNormalizada)
console.log(cadenaNormalizada.length)
=======
// console.log(sumar(3, 2, 3, 10))

// ...rest por su parte se utiliza como complemento
// En este caso vemos 3 formas distintas de declarar una constante nombre a partir de datosPersonales.
// la primera tomando el valor de nombre por notación de puntos,
// la segunda mediante la sintaxis de array,
// y la tercera con rest
// const nombre = datosPersonales.nombre
// const nombre = datosPersonales['nombre']
// const {nombre, ...rest} = datosPersonales
// console.log(nombre)
>>>>>>> clase_2
