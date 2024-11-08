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
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const prodserv = new product_service_1.ProductService();
class ProductController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                yield prodserv.createProduct(product);
                res.status(201).json(product);
            }
            catch (error) {
                console.error("Error in ProductController addProduct:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = req.filter || {};
                const products = yield prodserv.getProducts(filters);
                res.status(200).json(products);
            }
            catch (error) {
                console.error("Error in ProductController getAllProducts:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProductByIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const product = yield prodserv.getProductById(id);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error("Error in ProductController getProductByIds:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    get_random_product_excluding_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const current_product_id = req.query.current_product_id;
                const product = yield prodserv.get_random_product_excluding_id(current_product_id);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error("Error in ProductController get_random_product_excluding_id:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    modifiedProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updateData = req.body;
                const product = yield prodserv.modifiedProduct(id, updateData);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error("Error updating product:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProductsByBrandName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandName = req.params.brandName;
                const products = yield prodserv.getProductsByBrandName(brandName);
                res.status(200).json(products);
            }
            catch (error) {
                console.error("Error fetching products by brand name:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
