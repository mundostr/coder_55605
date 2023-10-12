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
    let suma = 0
    for (let nro of numeros) suma += nro
    return suma
}

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
