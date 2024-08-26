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
exports.PaymentService = void 0;
const payment_manager_1 = require("../managers/payment.manager");
const paymentman = new payment_manager_1.PaymentManager();
class PaymentService {
    getPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield paymentman.getPayments();
                return brand;
            }
            catch (error) {
                console.error("Error fetching brands :", error);
                throw new Error(`Error fetching brands: ${error.message}`);
            }
        });
    }
}
exports.PaymentService = PaymentService;
