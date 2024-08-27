import { body } from "express-validator";

export const deliveryValidation = [
  body("delivery_id").notEmpty().withMessage("Delivery ID is required"),
  body("delivery_status")
    .notEmpty()
    .withMessage("Delivery status is required")
    .isIn(["Pending", "Transit", "Complete"])
    .withMessage(
      'Invalid delivery status. Valid statuses are "Pending", "Transit", "Complete"'
    ),
];
