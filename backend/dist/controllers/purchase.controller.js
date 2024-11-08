"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const purchase_service_1 = require("../services/purchase.service");
const purchaseServ = new purchase_service_1.PurchaseService();
class PurchaseController {
    confirm_purchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "User is not authenticated" });
                    return;
                }
                const { paymentType } = req.body;
                const result = yield purchaseServ.confirm_purchase(user._id, paymentType);
                res.status(200).json({
                    message: "Purchase and delivery created successfully",
                    purchase: result.purchase,
                    delivery: result.delivery,
                });
            }
            catch (error) {
                console.error("Error in PurchaseController: confirm_purchase", error);
                res
                    .status(500)
                    .json({
                    message: "An error occurred while confirming the purchase",
                    error: error.message,
                });
            }
        });
    }
    user_purchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "User is not authenticated" });
                    return;
                }
                const purchases = yield purchaseServ.user_purchases(user._id);
                res.status(200).json(purchases);
            }
            catch (error) {
                console.error("Error in PurchaseController: user_purchases", error);
                res
                    .status(500)
                    .json({
                    message: "An error occurred while fetching user purchases",
                    error: error.message,
                });
            }
        });
    }
    get_purchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield purchaseServ.get_purchases();
                res.status(200).json(purchases);
            }
            catch (error) {
                console.error("Error in PurchaseController: get_purchases", error);
                res
                    .status(500)
                    .json({
                    message: "An error occurred while fetching all purchases",
                    error: error.message,
                });
            }
        });
    }
}
exports.PurchaseController = PurchaseController;
