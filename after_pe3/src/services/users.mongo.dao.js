import userModel from '../models/user.model.js';
import errorsDictionary from './error.dictionary.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class UserService {
    constructor() {
    }

    async addUser(user) {
        const newUser = await userModel.create(user);
        return newUser === null ? errorsDictionary.RECORD_CREATION_ERROR.message : errorsDictionary.RECORD_CREATION_OK.message;
    }

    async getUsers() {
        // password: 0 es para no retornar directamente el objeto sin el campo de clave
        return await userModel.find({}, { password: 0 }).lean();
    }

    async getUsersPaginated(page, limit) {
        return await userModel.paginate({}, { offset: (page * 50) - 50, limit: limit, lean: true })
    }
}

export default UserService;