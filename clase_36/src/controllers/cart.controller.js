import CartService from '../services/carts.mongo.dao.js';
import ProductService from '../services/products.mongo.dao.js';
import TicketService from '../services/tickets.mongo.dao.js';
import CustomError from "../services/error.custom.class.js";
import errorsDictionary from "../services/error.dictionary.js";

const service = new CartService();
const productService = new ProductService();
const ticketService = new TicketService();

export class CartController {
    constructor() {
    }

    async getCarts() {
        return await service.getCarts();
    }

    async getCart(id) {
        return await service.getCartById(id);
    }

    async getTopCart() {
        return await service.getTopCart();
    }

    async getTickets() {
        return await ticketService.getTickets();
    }

    async updateCart(cid, pid, qty) {
        const stockData = await productService.getProduct(pid);
        
        if (stockData === null) {
            throw new CustomError(errorsDictionary.PRODUCT_NOT_FOUND);
        } else {
            const stock = stockData.stock;
            if (stock < qty) {
                throw new CustomError({ ...errorsDictionary.INSUFFICIENT_STOCK, moreInfo: `max: ${stock} unidades` });
            } else {
                return await service.updateCart(cid, pid, qty);
            }
        }
    }

    async processPurchase(cid, uid) {
        const cart = await service.getCartById(cid);

        if (cart === null) {
            throw new CustomError({ ...errorsDictionary.ID_NOT_FOUND, moreInfo: 'cart' });
        } else {
            let total = 0;
            let cartModified = false;

            for (const item of cart.products) {
                const pid = item.pid._id;
                const qty = item.qty;
                const stock = item.pid.stock;
                const price = item.pid.price;
                
                if (stock > 0) {
                    let newStock = 0;
    
                    if (stock >= qty) {
                        newStock = stock - qty;
                        item.qty = 0;
                        total += qty * price;
                    } else {
                        newStock = 0;
                        item.qty -= stock;
                        total += stock * price;
                    }
                    
                    await productService.updateProduct(pid, { stock: newStock });
                    cartModified = true;
                }
            }
    
            if (cartModified) {
                await cart.save();
                await ticketService.addTicket({ amount: total, purchaser: uid });
                
                return cart;
            } else {
                return errorsDictionary.NO_TICKET_GENERATED.message;
            }
        }
    }
}