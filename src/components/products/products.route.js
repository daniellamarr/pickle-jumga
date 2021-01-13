import { Router } from 'express';
import { listProducts, fetchProduct } from './products.controller';

const productRouter = Router();

productRouter.get('/', listProducts);
productRouter.get('/:productId', fetchProduct);

export default productRouter;
