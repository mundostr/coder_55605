/**
 * Conceptos iniciales de Typescript.
 * https://www.typescriptlang.org/
 */

// Indicamos explícitamente que K debe ser un número
// Si intentamos asignarle otro tipo, el intellisense inmediatamente nos notificará
const K: number = 23;
console.log(K);

// Indicamos explícitamente que calculate recibe un parámetro numérico
// y retorna un objeto
const calculate = (nbr: number): object => {
    return { value: nbr * K };
}
console.log(calculate(3.5));
