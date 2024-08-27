import { body } from "express-validator";

export const confirmPurchaseValidators = [
  body("paymentType")
    .notEmpty()
    .withMessage("Payment type is required, it must be Stripe or Cash"),
];
