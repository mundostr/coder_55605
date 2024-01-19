import userModel from '../models/user.model.js';

class UserDTO {
    constructor(register) {
    }
}

class UserService {
    constructor() {
    }

    async getUsers() {
        try {
            return await userModel.find().lean();
        } catch (err) {
            return err.message
        }
    }

    async getUserById(id) {
        try {
            return await userModel.find({ _id: id }).lean();
        } catch (err) {
            return err.message
        }
    }

    async addUser(register) {
        try {
            return await userModel.create(register);
        } catch (err) {
            return err.message
        }
    }
}

export default UserService;