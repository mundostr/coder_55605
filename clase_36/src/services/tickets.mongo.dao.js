import ticketModel from '../models/ticket.model.js';
import userModel from '../models/user.model.js';
import MongoSingleton from './mongo.singleton.js';

MongoSingleton.getInstance();

class TicketService {
    constructor() {
    }

    async getTickets() {
        return await ticketModel.find().populate({ path: 'purchaser', select: '-password', model: userModel }).lean();
    }

    async addTicket(ticket) {
        return await ticketModel.create(ticket);
    }    
}

export default TicketService;