/**
 * Repaso conceptos básicos clases
 */

class Contador {
    // Variable ESTATICA, propiedad de la clase, NO de las instancias, es decir, es compartida por todas
    static #cuentaGeneral = 0

    // El método constructor se ejecuta de manera automática al instanciar un objeto
    constructor(responsable) {
        this.cuenta = 0
        this.responsable = responsable
    }

    setCuenta() {
        // También podemos utilizar this.cuenta = this.cuenta + 1 o this.cuenta += 1
        this.cuenta++
        Contador.#cuentaGeneral++
    }

    getResponsable() {
        return this.responsable
    }

    getCuentaIndividual() {
        return this.cuenta
    }

    static getCuentaGlobal() {
        return Contador.#cuentaGeneral
    }
}

const responsable1 = new Contador('Carlos')
const responsable2 = new Contador('Jorge')

responsable1.setCuenta()
responsable2.setCuenta()
responsable2.setCuenta()

console.log(responsable1.getCuentaIndividual())
console.log(responsable2.getCuentaIndividual())

// Forma incorrecta, intentando acceder directamente a la variable
// console.log(Contador.#cuentaGeneral)

// Forma correcta, accediendo mediante método
console.log(Contador.getCuentaGlobal())
// console.log(responsable1.getCuentaGlobal())
// console.log(responsable2.getCuentaGlobal())
