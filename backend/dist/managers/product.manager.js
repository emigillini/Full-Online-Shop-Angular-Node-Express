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
exports.ProductManager = void 0;
const brand_model_1 = require("../DAO/models/brand_model");
const product_model_1 = require("../DAO/models/product_model");
const mongoose_1 = require("mongoose");
class ProductManager {
    addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.ProductModel.create(productData);
                return product;
            }
            catch (error) {
                console.error("Error adding product:", error);
                throw new Error("Failed to add product");
            }
        });
    }
    getProducts() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            try {
                const products = yield product_model_1.ProductModel.find(filters).populate('brand').exec();
                return products;
            }
            catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.ProductModel.findById(id).populate('brand').exec();
                return product;
            }
            catch (error) {
                console.error("Error fetchingg product by ID:", error);
                throw new Error("Failed to fetch product by ID");
            }
        });
    }
    get_random_product_excluding_id(current_product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = new mongoose_1.Types.ObjectId(current_product_id);
                const products = yield product_model_1.ProductModel.find({ _id: { $ne: productId } }).exec();
                if (products.length === 0) {
                    return null;
                }
                const randomIndex = Math.floor(Math.random() * products.length);
                return products[randomIndex];
            }
            catch (error) {
                console.error("Error fetching random product:", error);
                throw new Error("Failed to fetch random product");
            }
        });
    }
    modifiedProduct(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield product_model_1.ProductModel.findByIdAndUpdate(id, updateData, {
                    new: true,
                    runValidators: true
                }).populate('brand').exec();
                return newProduct;
            }
            catch (error) {
                console.error("Error updating product :", error);
                throw new Error("Failed updating product");
            }
        });
    }
    getProductsByBrandName(brandName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Searching for brand: ${brandName}`);
                const brand = yield brand_model_1.BrandModel.findOne({ description: brandName }).exec();
                if (!brand) {
                    throw new Error("Brand not found");
                }
                console.log(`Searching for products with brand ID: ${brand._id}`);
                const products = yield product_model_1.ProductModel.find({ brand: brand._id }).populate('brand').exec();
                return products;
            }
            catch (error) {
                console.error("Error in ProductManager getProductsByBrandName:", error);
                throw new Error(`Error fetching products by brand name: ${error.message}`);
            }
        });
    }
}
exports.ProductManager = ProductManager;
