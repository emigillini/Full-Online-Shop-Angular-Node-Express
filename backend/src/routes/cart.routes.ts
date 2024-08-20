import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import passport from 'passport';


const cartRoutes = Router();
const cartCont = new CartController()

cartRoutes.delete('/delete_cart',passport.authenticate('jwt', { session: false }), cartCont.delete);
cartRoutes.post('/add_product', passport.authenticate('jwt', { session: false }), cartCont.addProduct); 
cartRoutes.post('/remove_item', passport.authenticate('jwt', { session: false }), cartCont.removeProduct); 
cartRoutes.post('/create_cart', passport.authenticate('jwt', { session: false }), cartCont.getOrCreateCart);
cartRoutes.get('/get_cart', passport.authenticate('jwt', { session: false }), cartCont.getCart);  



export default cartRoutes;