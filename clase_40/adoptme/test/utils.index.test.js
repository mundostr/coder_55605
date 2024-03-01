/**
 * Seguimos utilizando chai para las aseveraciones en los tests,
 * pero en este caso probamos el módulo de utilidades, no activamos
 * nada relacionado a bases de datos.
 */

import { expect } from 'chai';
import { createHash, passwordValidation } from '../src/utils/index.js';

const testPassword = 'abc123';
// Esta expresión regular (regex) nos permite verificar si la cadena
// tiene un formato válido de hash Bcrypt.
const validBcryptFormat = /^\$2[aby]\$10\$.{53}$/;

describe('Testing Utils', function () {
    before(function () {
    });

    beforeEach(function () {
    });

    it('Hashear correctamente la clave', async function () {
        const result = await createHash(testPassword);

        expect(result).to.match(validBcryptFormat);
    });

    it('Comparar a true si la clave hasheada coincide', async function () {
        const hashed = await createHash(testPassword);
        const compare = await passwordValidation({ password: hashed }, testPassword);

        expect(compare).to.be.true;
    });

    it('Comparar a false si la clave hasheada fue alterada', async function () {
        let hashed = await createHash(testPassword);
        hashed += 'pepe';
        const compare = await passwordValidation({ password: hashed }, testPassword);

        expect(compare).to.be.false;
    });
});
