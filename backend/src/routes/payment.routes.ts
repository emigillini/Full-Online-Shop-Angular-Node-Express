import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const paymentRoutes = Router();
const paymentCont = new PaymentController();

paymentRoutes.get("/", paymentCont.getPayments);

export default paymentRoutes;
