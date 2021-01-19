import { Router } from 'express';
import { verifyToken } from '../../helpers/token';
import { createCart, deleteCart, fetchCart } from './cart.controller';

const cartRouter = Router();

cartRouter.get('/', verifyToken, fetchCart);
cartRouter.post('/', verifyToken, createCart);
cartRouter.delete('/', verifyToken, deleteCart);

export default cartRouter;
