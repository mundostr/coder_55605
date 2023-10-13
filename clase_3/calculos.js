/**
 * Ejercicio con callbacks.
 * 
 * Recordemos que las funciones en JS, no solo pueden recibir argumentos primarios
 * como números, cadenas de caracteres o booleanos. También pueden recibir arrays,
 * objetos y otras funciones.
 * 
 * Un Callback esencialmente es una función, pasada como argumento a otra función,
 * que se ejecuta como respuesta a un determinado proceso.
 * 
 * Generamos 4 funciones simples para suma, resta, multiplicación y división.
 * Lo importante en este caso, es la función restante (operacion), que recibirá
 * como parámetros un par de números a operar, y una función callback.
 * 
 * Esta función callback, será una de las 4 primeras.
 */

const sumar = (n1, n2) => n1 + n2

const restar = (n1, n2) => n1 - n2

const multiplicar = (n1, n2) => n1 * n2

const dividir = (n1, n2) => n1 / n2


// Vemos como el 3er parámetro recibido por operacion, es una función.
const operacion = (n1, n2, cb) => {
    // cb es el nombre que hemos decidido utilizar internamente para hacer referencia a la función recibida
    // resultado es el valor retornado por esta función recibida (cb) tras pasarle los parámetros n1 y n2
    const resultado = cb(n1, n2)
    console.log(resultado)
}


// En este ejemplo, llamamos a operacion con los números 2 y 3, indicándole que la función callback
// a ejecutar, será dividir.
operacion(2, 3, dividir)