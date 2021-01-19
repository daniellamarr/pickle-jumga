import { Router } from 'express';
import { verifyToken } from '../../helpers/token';
import { createOrder } from './orders.controller';

const ordersRouter = Router();

ordersRouter.post('/', verifyToken, createOrder);

export default ordersRouter;
