/**
 * Assert es un módulo nativo de Node.
 * Lo utilizaremos para ejecutar las especificaciones
 * que deseamos superar en cada test.
 * 
 * Como probaremos el DAO de usuarios, importamos también mongoose y la clase Users
 * 
 * Para correr los tests, empleamos mocha, podemos hacerlo en modo watcher:
 * 
 * mocha --watch --parallel Users.dao.test.js
 */

import Assert from 'assert';
import mongoose from 'mongoose';
import Users from '../src/dao/Users.dao.js';

const assert = Assert.strict;
const connection = mongoose.connect('mongodb://127.0.0.1:27017/coder55605');
const testUser = { first_name: 'Carlos', last_name: 'Perren', email: 'carlos@perren.com', password: 'abc123' };

describe('Testing Users DAO', function () {
    /**
     * before se ejecuta ANTES de iniciar los tests.
     * Nos sirve para inicializar, en este caso para instanciar el DAO
     * y limpiar la colección sobre la cual probaremos.
     * 
     * Por supuesto podemos hacerlo también sobre una colección en marcha,
     * pero es recomendable utilizar una aparte para los primeros tests.
     */
    before(function () {
        this.dao = new Users();
        mongoose.connection.collections.users_testing.drop();
    });

    /**
     * beforeEach se ejecuta ANTES DE CADA test
     */
    beforeEach(function () {
        this.timeout = 5000;
    });

    // Cada bloque it(), engloba UN TEST
    // APROVECHAR el orden de los tests, ya que utilizamos una colección vacía,
    // primero verificamos el agregado, luego los get y modificaciones, y por
    // último el borrado.
    it('Agregar usuario con formato correcto', async function () {
        const result = await this.dao.save(testUser);

        /**
         * Puede tener uno o más asserts.
         * En este caso nos interesa confirmar que el resultado
         * es un objeto, que además contiene una propiedad _id
         * y otra pets, que es un array vacío.
         */
        assert.strictEqual(typeof(result), 'object');
        assert.ok(result._id);
        assert.deepStrictEqual(result.pets, []);
    });

    it('Recuperar usuario por email', async function () {
        const result = await this.dao.getBy({ email: testUser.email });
        // Aprovechamos a guardar el _id del usuario de prueba del test anterior
        // para usarlo en posteriores
        testUser._id = result._id;

        assert.strictEqual(typeof(result), 'object');
        assert.ok(result._id);
        // Verificamos que el email del usuario recuperado, coincida con el
        // indicado en la solicitud inicial
        assert.deepStrictEqual(result.email, testUser.email);
    });

    it('Recuperar todos los usuarios', async function () {
        const result = await this.dao.get();

        // Verificamos que la lista de usuarios retorne como array de objetos
        assert.strictEqual(Array.isArray(result), true);
        result.forEach(item => assert(typeof(item) === 'object'));
    });

    it('Actualizar usuario por email', async function () {
        const newEmail = 'pepe@pepe.com';
        // IMPORTANTE!, el DAO utiliza findByIdAndDelete().
        // Debe tener la configuración new: true para que retorne el documento modificado,
        // caso contrario retornará el estado del documento ANTES de la modificación.
        const result = await this.dao.update(testUser._id, { email: newEmail });

        // Verificamos que el resultado sea un objeto conteniendo
        // propiedad _id, y con email igual al nuevo email
        assert.strictEqual(typeof(result), 'object');
        assert.ok(result._id);
        assert.deepStrictEqual(result.email, newEmail);
    });

    it('Borrar usuario por id', async function () {
        // El DAO utiliza findByIdAndDelete(), retorna por defecto el documento borrado
        const result = await this.dao.delete(testUser._id);

        // Solo verificamos que el _id de este documento coincida con el que indicamos para borrar
        assert.strictEqual(typeof(result), 'object');
        assert.deepStrictEqual(result._id, testUser._id);
    });
});
