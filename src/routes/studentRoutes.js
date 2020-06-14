import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//loginRequired - middlewares para fechar as rotas
router.get('/', studentController.index);
router.post('/', studentController.store);
router.put('/:id', studentController.update);
router.get('/:id', studentController.show);
router.delete('/:id', studentController.delete);

export default router;