"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductValidators = exports.addProductValidators = void 0;
const express_validator_1 = require("express-validator");
exports.addProductValidators = [
    (0, express_validator_1.body)('product_id').notEmpty().withMessage('Product ID is required'),
    (0, express_validator_1.body)('quantity')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Quantity must be greater than zero')
];
exports.removeProductValidators = [
    (0, express_validator_1.body)('product_id').notEmpty().withMessage('Product ID is required'),
    (0, express_validator_1.body)('quantity')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Quantity must be greater than zero')
];
