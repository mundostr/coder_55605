import CustomRouter from './class.router.js'

export default class PetsRouter extends CustomRouter {
    init() {
        this.get('/', async (req, res) => {
            // res.status(200).send({ status: 'OK', data: 'Primer router personalizado' });
            res.sendSuccess('Primer router personalizado con sendSuccess');
        })
    }
}