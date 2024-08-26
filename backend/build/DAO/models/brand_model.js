"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BrandsCollection = "brands";
const BrandsSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
});
BrandsSchema.set('toObject', { virtuals: true });
BrandsSchema.set('toJSON', { virtuals: true });
exports.BrandModel = mongoose_1.default.model(BrandsCollection, BrandsSchema);
