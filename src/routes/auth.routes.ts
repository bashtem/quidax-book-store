import * as express from 'express';
import { validateCredentials } from '../middlewares/auth.middleware';
import { login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', [validateCredentials], login)

export default router;