import UserService from '../services/users.mongo.dao.js';
import { createHash } from '../utils.js';

const service = new UserService();

export class UserController {
    constructor() {
    }

    async getUsers() {
        return await service.getUsers();
    }

    async getUsersPaginated(page, limit) {
        return await service.getUsersPaginated(page, limit);
    }

    async addUser(body) {
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
    }
}