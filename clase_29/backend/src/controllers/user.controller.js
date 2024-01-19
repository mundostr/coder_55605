import Service from '../services/user.dao.js';

const service = new Service();

class UserController {
    constructor() {
    }

    async getUsers() {
        try {
            return await service.getUsers();
        } catch (err) {
            return err.message
        }
        
    }

    async getUserById(id) {
        try {
            return await service.getUserById(id);
        } catch (err) {
            return err.message
        }
    }

    async addUser(register) {
        try {
            return await service.addUser(register);
        } catch (err) {
            return err.message
        }
    }
}

export default UserController;