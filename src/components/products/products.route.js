import { Router } from 'express';
import { verifyToken } from '../../helpers/token';
import {
  listProducts, fetchProduct, listSellerProducts, createProduct
} from './products.controller';

const productRouter = Router();

productRouter.get('/', listProducts);
productRouter.get('/:productId', fetchProduct);
productRouter.get('/owner', verifyToken, listSellerProducts);
productRouter.post('/', verifyToken, createProduct);

export default productRouter;
