import userModel from '../models/user.model.js'

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
}