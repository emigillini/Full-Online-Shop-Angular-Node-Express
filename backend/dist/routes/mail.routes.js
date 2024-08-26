"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
const mailValidators_1 = require("../validators/mailValidators");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const mailRoutes = (0, express_1.Router)();
const emailController = new mail_controller_1.EmailController();
mailRoutes.post('/', mailValidators_1.emailValidation, validationErrorHandler_1.validationErrorHandler, emailController.sendEmail);
exports.default = mailRoutes;