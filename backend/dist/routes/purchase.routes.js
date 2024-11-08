"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_controller_1 = require("../controllers/purchase.controller");
const passport_1 = __importDefault(require("passport"));
const admin_1 = require("../middlewares/admin");
const purchaseValidators_1 = require("../validators/purchaseValidators");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const purchaseRoutes = (0, express_1.Router)();
const purchaseCont = new purchase_controller_1.PurchaseController();
purchaseRoutes.post("/confirm_purchase", passport_1.default.authenticate("jwt", { session: false }), purchaseValidators_1.confirmPurchaseValidators, validationErrorHandler_1.validationErrorHandler, purchaseCont.confirm_purchase);
purchaseRoutes.get("/user_purchases", passport_1.default.authenticate("jwt", { session: false }), purchaseCont.user_purchases);
purchaseRoutes.get("/", passport_1.default.authenticate("jwt", { session: false }), admin_1.adminOnly, purchaseCont.get_purchases);
exports.default = purchaseRoutes;
