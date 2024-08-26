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
exports.PurchaseService = void 0;
const purchase_manager_1 = require("../managers/purchase.manager");
const purchaseman = new purchase_manager_1.PurchaseManager();
class PurchaseService {
    confirm_purchase(userid, paymentType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchase = yield purchaseman.create_purchase(userid, paymentType);
                return purchase;
            }
            catch (error) {
                console.error("Error in PurchaseService confirmPurchase:", error);
                throw new Error(`Error creating cart: ${error.message}`);
            }
        });
    }
    user_purchases(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield purchaseman.user_purchases(userid);
                return purchases;
            }
            catch (error) {
                console.error("Error in PurchaseService user_purchases", error);
                throw new Error(`Error fecthing user_purchases: ${error.message}`);
            }
        });
    }
    get_purchases() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield purchaseman.get_purchases();
                return purchases;
            }
            catch (error) {
                console.error("Error in PurchaseService user_purchases", error);
                throw new Error(`Error fecthing user_purchases: ${error.message}`);
            }
        });
    }
}
exports.PurchaseService = PurchaseService;
