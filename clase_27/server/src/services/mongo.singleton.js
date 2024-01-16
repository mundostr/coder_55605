import mongoose from 'mongoose';
import config from '../config.js';


export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(config.MONGOOSE_URL);
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
            console.log('Conexión bbdd CREADA');
        } else {
            console.log('Conexión bbdd RECUPERADA');
        }

        return this.#instance;
    }
}