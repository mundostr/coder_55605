import orderModel from '../models/order.model.js';

class OrderDTO {
    constructor(register) {
    }
}

class OrderService {
    constructor() {
    }

    async getOrders() {
        try {
            return await orderModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    async getOrderById(id) {
        try {
            return await orderModel.find({ _id: id }).lean();
        } catch (err) {
            return err.message;
        }
    }

    async addOrder(register) {
        // Normalizar con DTO, calcular total automático
        try {
            return await orderModel.create(register);
        } catch (err) {
            return err.message
        }
    }
}

export default OrderService;