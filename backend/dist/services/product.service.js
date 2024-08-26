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
exports.ProductService = void 0;
const product_manager_1 = require("../managers/product.manager");
const prodman = new product_manager_1.ProductManager();
class ProductService {
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prodman.addProduct(productData);
                return product;
            }
            catch (error) {
                console.error("Error in ProductService createProduct:", error);
                throw new Error(`Error creating product: ${error.message}`);
            }
        });
    }
    getProducts() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            try {
                const products = yield prodman.getProducts(filters);
                return products;
            }
            catch (error) {
                console.error("Error in ProductService getProducts:", error);
                throw new Error(`Error fetching products: ${error.message}`);
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prodman.getProductById(id);
                return product;
            }
            catch (error) {
                console.error("Error in ProductService getProductById:", error);
                throw new Error(`Error fetching product by ID: ${error.message}`);
            }
        });
    }
    get_random_product_excluding_id(current_product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prodman.get_random_product_excluding_id(current_product_id);
                return product;
            }
            catch (error) {
                console.error("Error in ProductService getRandomProductExcludingId:", error);
                throw new Error(`Error fetching random product : ${error.message}`);
            }
        });
    }
    modifiedProduct(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prodman.modifiedProduct(id, updateData);
                return product;
            }
            catch (error) {
                console.error("Error in ProductService updating product:", error);
                throw new Error(`Error updating product: ${error.message}`);
            }
        });
    }
    getProductsByBrandName(brandName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prodman.getProductsByBrandName(brandName);
            }
            catch (error) {
                console.error("Error in ProductService getProductsByBrandName:", error);
                throw new Error(`Error fetching products by brand name: ${error.message}`);
            }
        });
    }
}
exports.ProductService = ProductService;
