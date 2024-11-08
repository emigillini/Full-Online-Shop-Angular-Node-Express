"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPurchaseValidators = void 0;
const express_validator_1 = require("express-validator");
exports.confirmPurchaseValidators = [
    (0, express_validator_1.body)("paymentType")
        .notEmpty()
        .withMessage("Payment type is required, it must be Stripe or Cash"),
];
