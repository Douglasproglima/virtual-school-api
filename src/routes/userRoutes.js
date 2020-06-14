import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, userController.index);
//router.get('/:id', userController.show);

router.post('/', userController.store); //Cria usuários externamente
router.post('/', loginRequired, userController.store); //Bloqueado
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/* Métodos Padrões em ES6
  index -> Lista Registro -> GET
  store/create -> Cria um novo registro -> POST
  delete -> Deleta um registro -> DELETE
  show -> Mostra um registro -> GET
  Update -> Atualiza um registro -> PATH or PUT
*/