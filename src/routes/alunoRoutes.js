import {
  Router,
} from 'express';

import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, alunoController.store);
router.put('/:id', loginRequired, alunoController.update);
router.delete('/:id', loginRequired, alunoController.delete);
router.get('/', alunoController.index);
router.get('/:id', alunoController.show);

export default router;
