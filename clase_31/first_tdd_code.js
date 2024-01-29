/**
 * Primer ejemplo, acercamiento a TDD
 * Test Driven Development, Desarrollo Conducido por Pruebas
 * 
 * Diseño de una función de suma mediante TDD
 * Partimos de una lista de tests que debemos superar, y vamos generando código
 * para pasarlos uno a uno:
 * 
 * test 1: si alguno de los elementos no es numérico, retornamos null.
 * test 2: si no se pasan parámetros, retornamos 0.
 * test 3: si los elementos están ok, retornamos la suma.
 * test 4: la función debe operar con una cantidad variable de argumentos.
 */

let passed = 0;

const tests = [
    { test: sumar(2, '3'), returned: null, desc: 'Si algún parámetro no es numérico, retorna null' },
    { test: sumar(), returned: 0, desc: 'Si no hay parámetros, retorna 0' },
    { test: sumar(2, 3), returned: 5, desc: 'Si los parámetros están ok, retorna la suma' },
    { test: sumar(2, 3, 5, 1), returned: 11, desc: 'Funciona con cualquier ctd de parámetros' }
];

/**
 * VERSION 1
 * Armamos la expresión básica, con solo 2 parámetros
 */
/* const sumar = (a, b) => {
    if (a === undefined && b === undefined) return 0;
    if (typeof(a) !== 'number' || typeof(b) !== 'number') return null;
    return a + b;
} */

/**
 * VERSION 2
 * Mejoramos la función para aceptar una cantidad variable de parámetros,
 * aprovechando el operador spread (...)
 */
/* const sumar = (...params) => {
    if (params.length === 0) return 0;

    for (let i = 0; i < params.length; i++) {
        if (typeof(params[i]) !== 'number') return null;
    }

    let total = 0;
    for (let i = 0; i < params.length; i++) {
        total += params[i];
    }
    return total;
} */

/**
 * VERSION 3
 * Realizamos una primer refactorización, aprovechando los métodos some() y reduce()
 * para acortar el código.
 */
const sumar = (...params) => {
    if (params.length === 0) return 0;
    if (params.some(param => typeof(param) !== 'number')) return null;
    return params.reduce((acc, param) => acc += param);
}

/**
 * Corremos el array de pruebas para verificar si logramos pasar todas.
 * Más adelante veremos cómo hacer esto con herramientas de testing.
 */
tests.forEach(item => {
    if (item.test === item.returned) {
        passed++;
        console.log(`${item.desc} (${item.test}): OK!`);
    } else {
        console.log(`${item.desc} (${item.test}): ERR`);
    }
})
console.log(`Passed: ${passed}/${tests.length}`);