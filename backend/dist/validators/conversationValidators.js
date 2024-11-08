"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationIdValidator = exports.createConversationValidators = void 0;
const express_validator_1 = require("express-validator");
exports.createConversationValidators = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Name cannot be empty"),
];
exports.conversationIdValidator = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid conversation ID"),
];
