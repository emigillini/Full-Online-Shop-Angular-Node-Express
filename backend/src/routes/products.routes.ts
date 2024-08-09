import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const productRoutes =Router();

const prodCont = new ProductController()


productRoutes.get('/get_random_product_excluding_id', prodCont.get_random_product_excluding_id);
productRoutes.patch('/:id', prodCont.modifiedProduct);
productRoutes.get('/:id', prodCont.getProductByIds);
productRoutes.post('/', prodCont.addProduct);
productRoutes.get('/', prodCont.getAllProducts);

export default productRoutes;