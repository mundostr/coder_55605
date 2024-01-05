import orderModel from '../models/orders.model.js'

export class OrderController {
    constructor() {
    }

    async getOrders(type) {
        try {
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