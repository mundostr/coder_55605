import UserService from '../services/users.mongo.dao.js';
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