import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { filterMiddleware } from '../middlewares/productFilter';
import passport from 'passport';
import { adminOnly } from '../middlewares/admin';

const productRoutes =Router();

const prodCont = new ProductController()


productRoutes.get('/get_random_product_excluding_id', prodCont.get_random_product_excluding_id);
productRoutes.patch('/:id', passport.authenticate('jwt', { session: false }),adminOnly, prodCont.modifiedProduct);
productRoutes.get('/:id', prodCont.getProductByIds);
productRoutes.post('/', passport.authenticate('jwt', { session: false }),adminOnly, prodCont.addProduct);
productRoutes.get('/',filterMiddleware, prodCont.getAllProducts);

export default productRoutes;