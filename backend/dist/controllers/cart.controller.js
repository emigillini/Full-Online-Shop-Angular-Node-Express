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
exports.CartController = void 0;
const cart_service_1 = require("../services/cart.service");
const cartserv = new cart_service_1.CartService();
class CartController {
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(400).json({ message: "User is not authenticated" });
                    return;
                }
                yield cartserv.deleteCart(user.id);
                res.status(200).json("Cart deleted successfully");
            }
            catch (error) {
                console.error("Error in CartController delete:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { product_id, quantity = 1 } = req.body;
                const updatedCart = yield cartserv.addProduct(user._id, product_id, quantity);
                res.status(200).json({ message: "Product Added", cart: updatedCart });
            }
            catch (error) {
                console.error("Error in CartController addProduct:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { product_id, quantity = 1 } = req.body;
                const updatedCart = yield cartserv.removeProduct(user._id, product_id, quantity);
                res.status(200).json({ message: "Product Removed", cart: updatedCart });
            }
            catch (error) {
                console.error("Error in CartController removeProduct:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getOrCreateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cart = yield cartserv.getOrCreateCart(user._id);
                res.status(200).json(cart);
            }
            catch (error) {
                console.error("Error fetching cart:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cart = yield cartserv.getCartByUser(user._id);
                res.status(200).json(cart);
            }
            catch (error) {
                console.error("Error fetching cart:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.CartController = CartController;
