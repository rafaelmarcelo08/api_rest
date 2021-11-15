import {
  Router,
} from 'express';

const router = new Router();

import tokenRoutes from '../controllers/TokenController';

router.post('/', tokenRoutes.store);

export default router;
