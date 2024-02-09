import { Router} from 'express';
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.get('/simple', async (req, res) => {
    let total = 0;
    for (let i = 0; i < 100000; i++) total += i;
    res.status(200).send({ status: 'OK', data: total });
})

router.get('/complex', async (req, res) => {
    let total = 0;
    for (let i = 0; i < 5e7; i++) total += i;
    res.status(200).send({ status: 'OK', data: total });
})

router.post('/login',sessionsController.loginUser);
router.post('/register',sessionsController.registerUser);


export default router;