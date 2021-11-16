import {
  Router,
} from 'express';

import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoController.index);
// router.get('/show', loginRequired, alunoController.show);

router.post('/', alunoController.store);
router.put('/', loginRequired, alunoController.update);
router.delete('/', loginRequired, alunoController.delete);

export default router;
