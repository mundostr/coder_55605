import OrderService from '../services/orders.mongo.dao.js';

const service = new OrderService();

export class OrderController {
    constructor() {
    }

    async getOrders(type) {
        try {
            return await service.getOrders(type);
        } catch (err) {
            return err.message
        }
    }
}