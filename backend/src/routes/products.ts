import express from 'express';
import { ProductController } from '../controllers/product.controller';

const productRoutes = express.Router();

const prodCont = new ProductController()


productRoutes.get('/products/get_random_product_excluding_id', prodCont.get_random_product_excluding_id);
productRoutes.patch('/products/:id', prodCont.modifiedProduct);
productRoutes.get('/products/:id', prodCont.getProductByIds);
productRoutes.post('/products', prodCont.addProduct);
productRoutes.get('/products', prodCont.getAllProducts);

export default productRoutes;