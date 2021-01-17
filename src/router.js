import { Router } from 'express';
import authRouter from './components/auth/auth.route';
import productRouter from './components/products/products.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);

export default router;
