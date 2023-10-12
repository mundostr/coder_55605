class Contador {
    static contadorGeneral = 0

    constructor(responsable) {
        this.contador = 0
        this.responsable = responsable
    }

    getResponsable() {
        return this.responsable
    }

    contar() {
        // this.contador = this.contador + 1
        this.contador++
        Contador.contadorGeneral++
    }

    getCuentaIndividual() {
        return this.contador
    }

    getCuentaGlobal() {
        return Contador.contadorGeneral
    }
}


const contador1 = new Contador('Carlos')
const contador2 = new Contador('Carolina')

contador1.contar()

contador2.contar()
contador2.contar()

console.log(contador1.getCuentaIndividual())
console.log(contador2.getCuentaIndividual())
console.log(contador1.getCuentaGlobal())
console.log(contador2.getCuentaGlobal())