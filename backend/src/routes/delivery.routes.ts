import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery.controller';
import passport from 'passport';
import { adminOnly } from '../middlewares/admin';


const deliveryRoutes = Router();
const deliveryCont = new DeliveryController()

deliveryRoutes.get('/',passport.authenticate('jwt', { session: false }),adminOnly, deliveryCont.getDeliveries);
deliveryRoutes.patch('/',passport.authenticate('jwt', { session: false }),adminOnly, deliveryCont.changeStatus);




export default deliveryRoutes;