import mysql from 'mysql2/promise';
import config from '../config.js';

class CartService {
    constructor() {
        this.connection = null;
        this.#connect();
    }

    async #connect() {
        this.connection = await mysql.createConnection({
            host: config.MYSQL_HOST,
            user: config.MYSQL_USER,
            password: config.MYSQL_PASS,
            database: config.MYSQL_DDBB
        });
    }

    async getCarts() {
        try {
            // Ya no realizamos consultas en el controlador, delegamos a este
            // DAO que se encarga de hacerlas mediante SQL en este caso, al
            // tratarse de una base de datos relacional
            if (!this.connection) this.#connect();
            const [carts, fields] = await this.connection.execute('SELECT * FROM carts');
            return carts;
        } catch (err) {
            return err.message
        }
    }
}

export default CartService;