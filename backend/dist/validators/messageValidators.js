"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteMessage = exports.validateCreateMessage = exports.validateGetAllMessages = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllMessages = [
    (0, express_validator_1.query)('conversation')
        .optional()
        .isString()
        .withMessage('Conversation ID must be a string')
];
exports.validateCreateMessage = [
    (0, express_validator_1.body)('conversationId')
        .notEmpty()
        .withMessage('Conversation ID is required')
        .isString()
        .withMessage('Conversation ID must be a string'),
    (0, express_validator_1.body)('content')
        .notEmpty()
        .withMessage('Content is required')
        .isString()
        .withMessage('Content must be a string')
];
exports.validateDeleteMessage = [
    (0, express_validator_1.param)('id')
        .notEmpty()
        .withMessage('Message ID is required')
        .isString()
        .withMessage('Message ID must be a string')
];
