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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("../config/stripe"));
class StripeService {
    static createPaymentIntent(amount_1) {
        return __awaiter(this, arguments, void 0, function* (amount, currency = 'eur') {
            try {
                const intent = yield stripe_1.default.paymentIntents.create({
                    amount,
                    currency,
                    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
                });
                return intent;
            }
            catch (error) {
                throw new Error(`Error creating payment intent: ${error.message}`);
            }
        });
    }
    static confirmPaymentIntent(paymentIntentId, paymentMethodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const intent = yield stripe_1.default.paymentIntents.confirm(paymentIntentId, {
                    payment_method: paymentMethodId,
                });
                return intent;
            }
            catch (error) {
                throw new Error(`Error confirming payment intent: ${error.message}`);
            }
        });
    }
}
exports.StripeService = StripeService;
