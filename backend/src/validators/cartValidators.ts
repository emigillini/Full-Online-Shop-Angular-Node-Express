import { body } from "express-validator";

export const addProductValidators = [
  body("product_id").notEmpty().withMessage("Product ID is required"),
  body("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be greater than zero"),
];

export const removeProductValidators = [
  body("product_id").notEmpty().withMessage("Product ID is required"),
  body("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be greater than zero"),
];
