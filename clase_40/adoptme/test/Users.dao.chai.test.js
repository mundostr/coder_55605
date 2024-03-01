/**
 * Para las verificaciones en cada test, en lugar del Assert nativo,
 * empleamos ahora chai,un módulo externo con una sintaxis más amigable,
 * basada en verbos y conectores en inglés. El resto se mantiene igual.
 * 
 * Para correr los tests, seguimos empleando mocha:
 * 
 * mocha --watch --parallel Users.dao.chai.test.js
 */

import { expect } from 'chai';
import mongoose from 'mongoose';
import Users from '../src/dao/Users.dao.js';

const connection = mongoose.connect('mongodb://127.0.0.1:27017/coder55605');
const testUser = { first_name: 'Carlos', last_name: 'Perren', email: 'carlos@perren.com', password: 'abc123' };

describe('Testing Users DAO', function () {
    before(function () {
        this.dao = new Users();
        mongoose.connection.collections.users_testing.drop();
    });

    beforeEach(function () {
        this.timeout = 5000;
    });

    it('Agregar usuario con formato correcto', async function () {
        /**
         * Podemos ver que la consulta es exactamente igual,
         * pero las verificaciones se realizan con una sintaxis
         * más amigable, enlazando verbos y conectores.
         */
        const result = await this.dao.save(testUser);

        expect(result).to.be.an('object');
        expect(result._id).to.be.not.null;
        expect(result.pets).to.be.deep.equal([]);
        expect(result.pets.length).to.be.equal(0);
    });

    it('Recuperar usuario por email', async function () {
        const result = await this.dao.getBy({ email: testUser.email });
        testUser._id = result._id;

        expect(result).to.be.an('object');
        expect(result._id).to.be.not.null;
        expect(result.email).to.be.equal(testUser.email);
    });

    it('Recuperar todos los usuarios', async function () {
        const result = await this.dao.get();

        expect(result).to.be.an('array');
        result.forEach(item => expect(item).to.be.an('object'));
    });

    it('Actualizar usuario por email', async function () {
        const newEmail = 'pepe@pepe.com';
        const result = await this.dao.update(testUser._id, { email: newEmail });

        expect(result).to.be.an('object');
        expect(result._id).to.be.not.null;
        expect(result.email).to.be.equal(newEmail);
    });

    it('Borrar usuario por id', async function () {
        const result = await this.dao.delete(testUser._id);

        expect(result).to.be.an('object');
        expect(result._id).to.be.deep.equal(testUser._id);
    });
});
