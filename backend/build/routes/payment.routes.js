"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const paymentRoutes = (0, express_1.Router)();
const paymentCont = new payment_controller_1.PaymentController();
paymentRoutes.get('/', paymentCont.getPayments);
exports.default = paymentRoutes;
