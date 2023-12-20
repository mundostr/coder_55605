import userModel from '../models/user.model.js'

export class UserController {
    constructor() {
    }

    async getUsers() {
        try {
            const users = await userModel.find().lean()
            // const users = await userModel.find({ first_name: 'Celia' }).explain('executionStats')
            return users
        } catch (err) {
            return err.message
        }
        
    }

    async getUsersPaginated(page, limit) {
        try {
            // Podemos usar el método paginate gracias a que hemos agregado el módulo mongoose-paginate-v2.
            // También podríamos hacerlo manualmente, pero este módulo es muy cómodo y nos devuelve todos
            // los datos necesarios en la respuesta para armar el paginado en el frontend.
            // Por supuesto, los valores de offset y limit, pueden llegar como parámetros.
            return await userModel.paginate(
                { gender: 'Female' },
                { offset: (page * limit) - limit, limit: limit, lean: true }
            )
        } catch (err) {
            return err.message
        }
    }
}