import { Router } from 'express';

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {}

    #applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (err) {
                params[1].status(500).send({ status: 'ERR', data: err.message })
            }
        })
    }

    #generateCustomResponses(req, res, next) {
        res.sendSuccess = payload => res.status(200).send({ status: 'OK', data: payload });
        res.sendUserError = err => res.status(400).send({ status: 'ERR', data: err.message });
        res.sendServerError = err => res.status(500).send({ status: 'ERR', data: err.message });
        next();
    }

    getRouter() {
        return this.router;
    }

    get(path, ...callbacks) {
        this.router.get(path, this.#generateCustomResponses, this.#applyCallbacks(callbacks));
    }

    post(path, ...callbacks) {
        this.router.post(path, this.#generateCustomResponses, this.#applyCallbacks(callbacks));
    }

    patch(path, ...callbacks) {
        this.router.patch(path, this.#generateCustomResponses, this.#applyCallbacks(callbacks));
    }

    put(path, ...callbacks) {
        this.router.put(path, this.#generateCustomResponses, this.#applyCallbacks(callbacks));
    }

    delete(path, ...callbacks) {
        this.router.delete(path, this.#generateCustomResponses, this.#applyCallbacks(callbacks));
    }
}