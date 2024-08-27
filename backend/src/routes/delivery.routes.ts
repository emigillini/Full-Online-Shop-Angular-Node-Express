import { Router } from "express";
import { DeliveryController } from "../controllers/delivery.controller";
import passport from "passport";
import { adminOnly } from "../middlewares/admin";
import { deliveryValidation } from "../validators/deliveryValidators";
import { validationErrorHandler } from "../middlewares/validationErrorHandler";

const deliveryRoutes = Router();
const deliveryCont = new DeliveryController();

deliveryRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminOnly,
  deliveryCont.getDeliveries
);

deliveryRoutes.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminOnly,
  deliveryValidation,
  validationErrorHandler,
  deliveryCont.changeStatus
);

export default deliveryRoutes;
