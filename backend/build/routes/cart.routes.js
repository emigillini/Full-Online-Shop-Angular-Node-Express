"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const passport_1 = __importDefault(require("passport"));
const cartValidators_1 = require("../validators/cartValidators");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const cartRoutes = (0, express_1.Router)();
const cartCont = new cart_controller_1.CartController();
cartRoutes.delete('/delete_cart', passport_1.default.authenticate('jwt', { session: false }), cartCont.delete);
cartRoutes.post('/add_product', passport_1.default.authenticate('jwt', { session: false }), cartValidators_1.addProductValidators, validationErrorHandler_1.validationErrorHandler, cartCont.addProduct);
cartRoutes.post('/remove_item', passport_1.default.authenticate('jwt', { session: false }), cartValidators_1.removeProductValidators, validationErrorHandler_1.validationErrorHandler, cartCont.removeProduct);
cartRoutes.post('/create_cart', passport_1.default.authenticate('jwt', { session: false }), cartCont.getOrCreateCart);
cartRoutes.get('/get_cart', passport_1.default.authenticate('jwt', { session: false }), cartCont.getOrCreateCart);
exports.default = cartRoutes;
