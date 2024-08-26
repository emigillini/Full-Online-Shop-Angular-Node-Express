"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidators = exports.loginValidators = exports.registerValidators = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidators = [
    (0, express_validator_1.body)('username').notEmpty().withMessage('Username is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
exports.loginValidators = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
exports.updateUserValidators = [
    (0, express_validator_1.body)('username').optional().notEmpty().withMessage('Username cannot be empty'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
