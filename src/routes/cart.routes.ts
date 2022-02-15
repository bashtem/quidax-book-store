import * as express from 'express';
import { validateCartUpdate } from '../middlewares/cart.middleware';
import { addOrUpdateCart, fetchCartItems } from '../controllers/cart.controller';

const router = express.Router();

router.get('/', fetchCartItems)

router.put('/', [validateCartUpdate], addOrUpdateCart)

export default router;