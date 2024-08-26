"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentCollection = "payment";
const PaymentSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
});
PaymentSchema.set('toObject', { virtuals: true });
PaymentSchema.set('toJSON', { virtuals: true });
exports.PaymentModel = mongoose_1.default.model(PaymentCollection, PaymentSchema);
