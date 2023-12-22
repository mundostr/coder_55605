import { Router } from 'express';

/**
 * Clase para rutas Express personalizadas
 * 
 * En lugar de importar e instanciar directamente Router desde Express,
 * como lo hemos hecho en los demás paquetes de rutas, podemos hacerlo
 * dentro de una clase.
 * 
 * Esta clase se pondrá en medio y pasará al Router de Express todas las
 * definiciones de rutas que realicemos. Será útil para agregar métodos
 * a res (ver debajo generateCustomResponses()) y normalizar distintos
 * elementos para que sean iguales en todos los paquetes de rutas generados.
 */
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

    // Definimos los tipos de solicitud aceptados por la clase
    // Cada uno a través de la instancia que se genere, recibirá la ruta y el listado
    // de callbacks a ejecutar.
    // Vemos también que aprovechamos para inyectar #generateCustomResponses() como middleware, 
    // podríamos también inyectar otros elementos.
    // De esta forma, cualquier paquete de rutas definido a través de una instancia de esta
    // clase, dispondrá ya de estos métodos y elementos.
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