import userModel from '../models/user.model.js'
import { faker } from '@faker-js/faker';
import { createHash } from '../utils.js';

export class UserController {
    constructor() {
    }

    async getUsers() {
        try {
            const users = await userModel.find({}, { password: 0 }).lean()
            // const users = await userModel.find({ first_name: 'Celia' }).explain('executionStats')
            return users
        } catch (err) {
            return err.message
        }
        
    }

    async getUsersPaginated(page, limit) {
        try {
            return await userModel.paginate(
                { gender: 'Female' },
                { offset: (page * 50) - 50, limit: limit, lean: true }
            )
        } catch (err) {
            return err.message
        }
    }

    async generateMockUsers(qty) {
        const mockCarts = [];
        const mockUsers = [];
        const possibleRoles = ['user', 'premium', 'admin'];

        for (let i = 0; i < qty; i++) {
            const cart = {
                _id: faker.database.mongodbObjectId(),
                products: [],
                total: 0
            }

            mockCarts.push(cart);
        }

        for (let i = 0; i < qty; i++) {
            const user = {
                _id: faker.database.mongodbObjectId(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int(70) + 1,
                gender: faker.person.sex(),
                password: createHash(faker.internet.password({ length: 8 })),
                cart: mockCarts[i]._id,
                role: faker.helpers.arrayElement(Object.values(possibleRoles))
            };
            mockUsers.push(user);
        }

        return [mockUsers, mockCarts];
    }
}