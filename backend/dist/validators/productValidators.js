"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandNameValidator = exports.modifyProductValidators = exports.addProductValidators = void 0;
const express_validator_1 = require("express-validator");
exports.addProductValidators = [
    (0, express_validator_1.body)("model").notEmpty().withMessage("Model is required"),
    (0, express_validator_1.body)("brand").notEmpty().withMessage("Brand is required"),
    (0, express_validator_1.body)("color").notEmpty().withMessage("Color is required"),
    (0, express_validator_1.body)("size").notEmpty().withMessage("Size is required"),
    (0, express_validator_1.body)("price")
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => value > 0)
        .withMessage("Price must be positive"),
    (0, express_validator_1.body)("stock")
        .isNumeric()
        .withMessage("Stock must be a number")
        .custom((value) => value >= 0)
        .withMessage("Stock must be non-negative"),
    (0, express_validator_1.body)("image").isString().withMessage("Image must be a string"),
    (0, express_validator_1.body)("detail").isString().withMessage("Detail must be a string"),
];
exports.modifyProductValidators = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid product ID"),
    (0, express_validator_1.body)("price")
        .optional()
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => value > 0)
        .withMessage("Price must be positive"),
    (0, express_validator_1.body)("stock")
        .optional()
        .isNumeric()
        .withMessage("Stock must be a number")
        .custom((value) => value >= 0)
        .withMessage("Stock must be non-negative"),
    (0, express_validator_1.body)("image").optional().isString().withMessage("Image must be a string"),
    (0, express_validator_1.body)("detail").optional().isString().withMessage("Detail must be a string"),
];
exports.brandNameValidator = [
    (0, express_validator_1.param)("brandName").notEmpty().withMessage("Brand name is required"),
];
