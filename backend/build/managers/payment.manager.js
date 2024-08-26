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
exports.PaymentManager = void 0;
const payment_model_1 = require("../DAO/models/payment_model");
class PaymentManager {
    getPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield payment_model_1.PaymentModel.find();
                return payments;
            }
            catch (error) {
                console.error("Error in PaymentManager getPayments:", error);
                throw new Error(`Error fetching brands : ${error.message}`);
            }
        });
    }
}
exports.PaymentManager = PaymentManager;
