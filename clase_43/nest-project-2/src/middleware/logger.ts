/**
 * Esta es la forma en la que Nest organiza los middleware,
 * a través de una clase que implementa la interfaz NestMiddleware
 * 
 * Podemos ver cómo recuperamos los objectos Express habituales (request, response, next)
 */

import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

export default class Logger implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Solicitud tipo ${req.method} ruta ${req.baseUrl}`);
        next();
    };
}
