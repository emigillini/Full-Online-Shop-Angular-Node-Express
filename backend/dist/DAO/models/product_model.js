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
exports.ProductModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductsCollection = "products";
const ProductSchema = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
        enum: ["Model A", "Model B", "Model C", "Model D", "Model E"],
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "brands",
        required: true,
    },
    color: {
        type: String,
        required: true,
        enum: ["Red", "Blue", "White", "Black"],
    },
    size: {
        type: Number,
        required: true,
        enum: [5, 6, 7, 8],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, default: null },
    detail: { type: String, default: "" },
});
ProductSchema.set("toObject", { virtuals: true });
ProductSchema.set("toJSON", { virtuals: true });
exports.ProductModel = mongoose_1.default.model(ProductsCollection, ProductSchema);
