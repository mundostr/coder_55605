import userModel from '../models/user.model.js';
import errorsDictionary from './error.dictionary.js';

class UserService {
    constructor() {
    }

    async addUser(user) {
        try {
            const newUser = await userModel.create(user);
            // En este caso utilizamos el diccionario de errores para retornar el mensaje, sin disparar un nuevo error
            return newUser === null ? errorsDictionary.RECORD_CREATION_ERROR.message : errorsDictionary.RECORD_CREATION_OK.message;
        } catch (err) {
            return err.message;
        }
    }

    async getUsers() {
        try {
            // password: 0 es para no retornar el campo de clave
            return await userModel.find({}, { password: 0 }).lean();
        } catch (err) {
            return err.message;
        }
    }

    async getUsersPaginated(page, limit) {
        try {
            return await userModel.paginate(
                {},
                { offset: (page * 50) - 50, limit: limit, lean: true }
            )
        } catch (err) {
            return err.message
        }
    }
}

export default UserService;