import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import passport from 'passport';


const cartRoutes = Router();
const cartCont = new CartController()

cartRoutes.delete('/',passport.authenticate('jwt', { session: false }), cartCont.delete);
cartRoutes.post('/add_product_to_cart', passport.authenticate('jwt', { session: false }), cartCont.addProduct); 
cartRoutes.post('/remove_item_from_cart', passport.authenticate('jwt', { session: false }), cartCont.removeProduct); 
cartRoutes.post('/', passport.authenticate('jwt', { session: false }), cartCont.getOrCreateCart); 


export default cartRoutes;