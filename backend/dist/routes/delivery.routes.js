"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delivery_controller_1 = require("../controllers/delivery.controller");
const passport_1 = __importDefault(require("passport"));
const admin_1 = require("../middlewares/admin");
const deliveryValidators_1 = require("../validators/deliveryValidators");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const deliveryRoutes = (0, express_1.Router)();
const deliveryCont = new delivery_controller_1.DeliveryController();
deliveryRoutes.get("/", passport_1.default.authenticate("jwt", { session: false }), admin_1.adminOnly, deliveryCont.getDeliveries);
deliveryRoutes.patch("/", passport_1.default.authenticate("jwt", { session: false }), admin_1.adminOnly, deliveryValidators_1.deliveryValidation, validationErrorHandler_1.validationErrorHandler, deliveryCont.changeStatus);
exports.default = deliveryRoutes;
