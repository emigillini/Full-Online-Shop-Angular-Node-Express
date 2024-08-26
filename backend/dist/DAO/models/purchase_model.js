"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PurchaseCollection = "purchases";
const PurchaseSchema = new mongoose_1.default.Schema({
    invoice_number: { type: String, required: true, default: function () {
            const timestamp = Date.now().toString(36);
            return `TICKET-${timestamp}`;
        }, },
    date: { type: Date, required: true, default: Date.now },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', required: true },
    total: { type: Number, required: true, default: 0 },
    paymentType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'paymentType', required: true },
    cart: { type: mongoose_1.Schema.Types.ObjectId, ref: 'carts', required: true },
    delivery: { type: mongoose_1.Schema.Types.ObjectId, ref: 'delivery' }
});
PurchaseSchema.set('toObject', { virtuals: true });
PurchaseSchema.set('toJSON', { virtuals: true });
exports.PurchaseModel = mongoose_1.default.model(PurchaseCollection, PurchaseSchema);
