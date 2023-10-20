/**
 * Ejemplo simple propuesto en los slides para entrar en ritmo
 * Generar x números al azar, guardarlos en un array y armar
 * un objeto que contenga como keys los números generados, y
 * como values la cantidad de veces que han salido.
 */


// Constantes y variables globales
const MIN_NUMBER = 1
const MAX_NUMBER = 20
const REPEAT_LIMIT = 5

const numbers =  []
const details = {15: 1}

// Flujo principal
for (let i = 0; i < REPEAT_LIMIT; i++) {
    const randomNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER
    numbers.push(randomNumber)
}
console.log(numbers)

// Recorremos el array de números e intentamos crear items en el objeto details
// en base a esos números, pero aprovechando el operador ||, podemos saber si el
// item ya se encuentra en el objeto, en ese caso incrementarlo en 1, caso contrario, crearlo.
numbers.forEach(item => {
    // Recordar!: ?? chequea por null y undefined, || por null, undefined, 0 y ''
    details[item] = (details[item] || 0) + 1
})
console.log(details)