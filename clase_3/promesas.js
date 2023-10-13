/**
 * Primer ejercicio con Promesas.
 * 
 * Las Promesas son un mecanismo muy importante en JS. Una promesa esencialmente
 * es un COMPROMISO A FUTURO. Se genera cuando solicitamos al sistema un resultado
 * que no puede entregar de inmediato, por lo tanto el sistema crea una promesa
 * (Promise), comprometiéndose a entregar el resultado luego, ni bien esté disponible.
 */

// Esta es una función normal, que simplemente recibe dos parámetros y retorna
// el primero / el segundo
const dividirNormal = (dividendo, divisor) => dividendo / divisor

// Esta es la misma función pero con estructura de Promesa (Promise)
const dividirPromise = (dividendo, divisor) => {
    // La función ya no retorna el cálculo directo, sino una promesa.
    // La promesa siempre tiene 2 resultados posibles; si todo sale ok
    // ejecutará un resolve(), sino un reject()
    return new Promise((resolve, reject) => {
        // Si el divisor es cero, disparamos un reject
        if (divisor === 0) reject('No se puede dividir por 0')
        
        // Si todo va bien, disparamos el resolve, retornando el cálculo
        // El setTimeout se agrega solo como muestra, para simular una demora,
        // ya que las promesas están relacionadas justamente a procesos que toman
        // tiempo, como por ejemplo una consulta API, una grabación a archivo, etc.
        setTimeout(() => {
            resolve(dividendo / divisor)
        }, 3000);
    })
}

// En la llamada a una función normal, asignamos el resultado de inmediato, o
// lo pasamos como argumento a lo que corresponda (el console.log() en este caso).
console.log(dividirNormal(3, 2))

// En la llamada a una promesa, debemos utilizar los métodos then y catch, opcionalmente
// podemos también utilizar finally().
// Llamamos a la función
dividirPromise(3, 3)
.then((resultado) => {
    // si todo anduvo bien y se ejecutó el resolve, el sistema procesará este método then()
    console.log(resultado)
})
.catch((err) => {
    // si en cambio hubo un problema y se disparó un reject, ingresará por catch()
    console.log(err)
})
.finally(() => {
    // Este método finally() nos permite ejecutar cualquier cosa que necesitemos, luego de
    // resuelta la promesa, sin importar si anduvo todo bien o no.
    console.log('Esto se ejecuta siempre al final')
})