"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsCollection = "products";
const ProductSchema = new mongoose_1.default.Schema({
    model: { type: Number, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, default: null },
    detail: { type: String, default: '' },
});
exports.ProductModel = mongoose_1.default.model(ProductsCollection, ProductSchema);
