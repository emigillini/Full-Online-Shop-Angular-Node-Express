"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = void 0;
const express_validator_1 = require("express-validator");
const validationErrorHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validationErrorHandler = validationErrorHandler;
