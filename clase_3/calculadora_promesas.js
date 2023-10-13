/**
 * Ejemplo de utilización de Promesas (Promises) con sintaxis alternativa.
 * 
 * Si bien es perfectamente válido utilizar la sintaxis tradicional then() catch()
 * para gestionar promesas, desde la especificación Ecmascript 2017, tenemos disponible
 * la alternativa async / await, que en muchos casos nos permite generar un código más limpio.
 */

// Generamos 4 funciones simples que retornan promesas
const suma = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) reject('Operación innecesaria')
        if (a + b < 0) reject('La calculadora solo debe devolver valores positivos')
        resolve(a + b)
    })
}

const resta = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) reject('Operación no válida')
        if (a - b < 0) reject('La calculadora solo debe devolver valores positivos')
        resolve(a - b)
    })
}

const multiplicacion = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) reject('Operación no válida')
        if (a * b < 0) reject('La calculadora solo debe devolver valores positivos')
        resolve(a * b)
    })
}

const division = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0 || b < 0) reject('Operación no válida, división por cero')
        resolve(a / b)
    })
}

// Generamos una función cálculo para mostrar el uso de async / await
// Vemos que la función está declarada mediante sintaxis arrow, pero delante
// de los parámetros aparece el modificador async, es decir, estamos indicando
// expresamente a JS que se trata de una función ASINCRONA.
// También aparece un bloque try / catch para capturar un posible error.
const calculos = async () => {
    try {
        // Como estamos en el ambito de una función asíncrona, podemos utilizar await
        // para "esperar" el resultado de una promesa, de esta forma no necesitamos el bloque then()
        const resultado = await division(10, 0)
        // Este console log no se ejecutará hasta que se resuelva la promesa (resolve)
        console.log(resultado)
    }
    catch(err) {
        // Si algo anduvo mal (reject), el sistema vendrá al catch().
        console.log(err)
    }
}


calculos()