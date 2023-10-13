/**
 * Variantes de sintaxis para utilizar callbacks, ejemplos con map
*/

const valores = [1, 2, 3, 4, 5]

// Podemos utilizar la sintaxis tradicional de function sin problemas
const nuevosValores1 = valores.map(function (x) {
    return x + 1
})
console.log(nuevosValores1)

// También podemos emplear las arrow functions
const nuevosValores2 = valores.map((x) => {
    return x + 1
})
console.log(nuevosValores2)

// Recordemos que en las arrow, la "flecha" separa precisamente los parámetros (izquierda)
// del bloque a ejecutar (derecha)
// Cuando la función recibe un único parámetro, podemos prescindir de los paréntesis (izquierda),
// y si procesa una única instrucción, también podemos prescindir de las llaves (derecha) para enmarcar
// el bloque, aprovechando el return implícito de las arrow
const nuevosValores3 = valores.map(x => x + 1)
console.log(nuevosValores3)
