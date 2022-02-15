import * as express from 'express';
import authRouter from './auth.routes'
import bookRouter from './book.routes'
import cartRouter from './cart.routes'
import { verifyToken } from '../middlewares/auth.middleware';

export const router = express.Router();

router.use('/auth', authRouter);

router.use('/books', [verifyToken], bookRouter);

router.use('/carts', [verifyToken], cartRouter);
