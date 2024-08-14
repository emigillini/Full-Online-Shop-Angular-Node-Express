import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery.controller';
import passport from 'passport';


const deliveryRoutes = Router();
const deliveryCont = new DeliveryController()

deliveryRoutes.get('/',passport.authenticate('jwt', { session: false }), deliveryCont.getDeliveries);
deliveryRoutes.patch('/',passport.authenticate('jwt', { session: false }), deliveryCont.changeStatus);




export default deliveryRoutes;