import { body, param } from "express-validator";

export const addProductValidators = [
  body("model").notEmpty().withMessage("Model is required"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("color").notEmpty().withMessage("Color is required"),
  body("size").notEmpty().withMessage("Size is required"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be positive"),
  body("stock")
    .isNumeric()
    .withMessage("Stock must be a number")
    .custom((value) => value >= 0)
    .withMessage("Stock must be non-negative"),
  body("image").isString().withMessage("Image must be a string"),
  body("detail").isString().withMessage("Detail must be a string"),
];

export const modifyProductValidators = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be positive"),
  body("stock")
    .optional()
    .isNumeric()
    .withMessage("Stock must be a number")
    .custom((value) => value >= 0)
    .withMessage("Stock must be non-negative"),
  body("image").optional().isString().withMessage("Image must be a string"),
  body("detail").optional().isString().withMessage("Detail must be a string"),
];

export const brandNameValidator = [
  param("brandName").notEmpty().withMessage("Brand name is required"),
];
