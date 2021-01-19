import { Router } from 'express';
import authRouter from './components/auth/auth.route';
import cartRouter from './components/cart/cart.route';
import ordersRouter from './components/orders/orders.route';
import productRouter from './components/products/products.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/orders', ordersRouter);

export default router;
