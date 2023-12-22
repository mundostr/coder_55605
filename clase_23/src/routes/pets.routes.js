import CustomRouter from './class.router.js'

/**
 * Ejemplo de uso de clase personalizada para manejo de rutas
 * Creamos una clase PetsRouter que extiende CustomRouter, es decir,
 * es HIJA de CustomRouter, y por lo tanto HEREDA todos métodos y
 * propiedades.
 * 
 * Hacemos esto para redefinir mediante el método init() nuestra lista
 * específica de rutas.
 * 
 * Podemos ver el uso del ejemplo de sendSuccess(), un método que obviamente
 * no está disponible de forma predeterminada en el objeto res, pero lo usamos
 * en este caso ya que es inyectado por un middleware en la clase CustomRouter.
 */
export default class PetsRouter extends CustomRouter {
    init() {
        this.get('/', async (req, res) => {
            // res.status(200).send({ status: 'OK', data: 'Primer router personalizado' });
            res.sendSuccess('Primer router personalizado con sendSuccess');
        })
    }
}