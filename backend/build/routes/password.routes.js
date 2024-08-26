"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_controller_1 = require("../controllers/password.controller");
const passwordRoutes = (0, express_1.Router)();
const passwordController = new password_controller_1.PasswordController();
passwordRoutes.post('/reset-password-request', passwordController.requestPasswordReset);
passwordRoutes.post('/reset-password/:uid/:token/', passwordController.resetPassword);
exports.default = passwordRoutes;
