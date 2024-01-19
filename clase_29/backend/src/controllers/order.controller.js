import Service from '../services/order.dao.js';

const service = new Service();

class OrderController {
    constructor() {
    }

    async getOrders() {
        try {
            return await service.getOrders();
        } catch (err) {
            return err.message
        }
        
    }

    async getOrderById(id) {
        try {
            return await service.getOrderById(id);
        } catch (err) {
            return err.message
        }
    }

    async addOrder(register) {
        try {
            return await service.addOrder(register);
        } catch (err) {
            return err.message
        }
    }
}

export default OrderController;