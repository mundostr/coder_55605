import orderModel from '../models/orders.model.js'

export class OrderController {
    constructor() {
    }

    async getOrders(type) {
        try {
            // return await orderModel.find().lean()
            // El método aggregate() nos permite ejecutar varios procesos en una misma consulta
            // En este caso filtrar por tipo de pedido, luego agrupar por nombre y calcular cantidad total en cada caso,
            // ordenar ascendente / descendente y más
            const process = await orderModel.aggregate([
                { $match: { size: type }},
                { $group: { _id: '$name', totalQuantity: { $sum: '$quantity' }}},
                { $sort: { totalQuantity: -1 }},
                { $group: { _id: 1, orders: { $push: '$$ROOT' }}},
                { $project: { _id: 0, orders: '$orders' }},
                // { $merge: { into: 'reports' }}
            ])

            return process
        } catch (err) {
            return err.message
        }
    }
}