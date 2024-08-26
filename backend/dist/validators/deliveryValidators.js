"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.deliveryValidation = [
    (0, express_validator_1.body)('delivery_id').notEmpty().withMessage('Delivery ID is required'),
    (0, express_validator_1.body)('delivery_status').notEmpty().withMessage('Delivery status is required')
        .isIn(['Pending', 'Transit', 'Complete'])
        .withMessage('Invalid delivery status. Valid statuses are "Pending", "Transit", "Complete"')
];
