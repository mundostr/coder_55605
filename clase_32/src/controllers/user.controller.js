import UserService from '../services/users.mongo.dao.js';
import { faker } from '@faker-js/faker';
import { createHash } from '../utils.js';

const service = new UserService();

export class UserController {
    constructor() {
    }

    async getUsers() {
        try {
            return await service.getUsers();
        } catch (err) {
            return err.message
        }
    }

    async getUsersPaginated(page, limit) {
        try {
            return await service.getUsersPaginated(page, limit);
        } catch (err) {
            return err.message
        }
    }

    // Este método se implementó directamente acá, podría también delegar al servicio
    generateMockUsers(qty) {
        const mockCarts = [];
        const mockUsers = [];
        const possibleRoles = ['user', 'premium'];

        for (let i = 0; i < qty; i++) {
            const cart = {
                _id: faker.database.mongodbObjectId(),
                products: [],
                total: 0
            }

            mockCarts.push(cart);
        }
        
        for (let i = 0; i < qty; i++) {
            const mock = {
                _id: faker.database.mongodbObjectId(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int(70) + 1,
                gender: faker.person.sex(),
                password: createHash(faker.internet.password({ length: 8 })),
                cart: mockCarts[i]._id,
                role: faker.helpers.arrayElement(Object.values(possibleRoles))
            }
            mock.gender = mock.gender.charAt(0).toUpperCase() + mock.gender.slice(1);
            mockUsers.push(mock);
        }

        return [mockUsers, mockCarts];
    }

    async addUser(body) {
        try {
            // Armamos el objeto de usuario para pasar al servicio
            // Esto debería hacerse idealmente a través de un DTO separado
            const newUser = {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                age: body.age,
                gender: body.gender,
                password: createHash(body.password),
                cart: 0,
                role: body.role
            }
            
            return await service.addUser(newUser);
        } catch (err) {
            return err.message;
        }
    }
}