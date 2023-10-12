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
    let suma = 0
    for (let nro of numeros) suma += nro
    return suma
}
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