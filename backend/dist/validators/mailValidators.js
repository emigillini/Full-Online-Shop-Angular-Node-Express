"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = void 0;
const express_validator_1 = require("express-validator");
exports.emailValidation = [
    (0, express_validator_1.body)("subject").notEmpty().withMessage("Subject is required"),
    (0, express_validator_1.body)("message").notEmpty().withMessage("Message is required"),
    (0, express_validator_1.body)("toEmail").isEmail().withMessage("Valid email is required"),
];
