import { Router } from 'express';
import { PurchaseController } from '../controllers/purchase.controller';
import passport from 'passport';
import { adminOnly } from '../middlewares/admin';
import { 
  confirmPurchaseValidators, 
} from '../validators/purchaseValidators';
import { validationErrorHandler } from '../middlewares/validationErrorHandler';


const purchaseRoutes = Router();
const purchaseCont = new PurchaseController();

purchaseRoutes.post(
  '/confirm_purchase', 
  passport.authenticate('jwt', { session: false }), 
  confirmPurchaseValidators,
  validationErrorHandler,
  purchaseCont.confirm_purchase
);

purchaseRoutes.get(
  '/user_purchases', 
  passport.authenticate('jwt', { session: false }), 
  purchaseCont.user_purchases
);

purchaseRoutes.get(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  adminOnly, 
  purchaseCont.get_purchases
);

export default purchaseRoutes;
