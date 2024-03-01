import { expect } from 'chai';
import UserDTO from '../src/dto/User.dto.js';

const testUser = { first_name: 'Carlos', last_name: 'Perren', email: 'carlos@perren.com', password: 'abc123' };

describe('Testing DTO User', function () {
    before(function () {
    });

    beforeEach(function () {
    });

    it('Unificar first_name y last_name en name', async function () {
        const result = UserDTO.getUserTokenFrom(testUser);

        expect(result).to.be.an('object');
        expect(result).to.have.own.property('name');
        expect(result).to.have.own.property('role');
        expect(result).to.have.own.property('email');
        expect(result.name).to.be.equal(`${testUser.first_name} ${testUser.last_name}`);
    });

    it('Eliminar propiedades innecesarias', async function () {
        const result = UserDTO.getUserTokenFrom(testUser);

        expect(result).to.not.have.own.property('password');
        expect(result).to.not.have.own.property('first_name');
        expect(result).to.not.have.own.property('last_name');
    });
});