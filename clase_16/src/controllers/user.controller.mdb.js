import userModel from '../models/user.model.js'

export class UserController {
    constructor() {
    }

    async getUsers() {
        try {
            const users = await userModel.find()
            // El método explain() permite recibir estadísticas de la consulta, en lugar del paquete
            // en sí de resultados. Solo lo habilitamos temporalmente para comparar la demora de la
            // consulta con y sin índices.
            // const users = await userModel.find({ first_name: 'Celia' }).explain('executionStats')
            return users
        } catch (err) {
            return err.message
        }
        
    }
}