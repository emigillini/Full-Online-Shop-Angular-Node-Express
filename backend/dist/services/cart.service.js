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
exports.CartService = void 0;
const cart_manager_1 = require("../managers/cart.manager");
const cartman = new cart_manager_1.CartManager();
class CartService {
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cartman.createCart(userId);
                return cart;
            }
            catch (error) {
                console.error("Error in CartService createCart:", error);
                throw new Error(`Error creating cart: ${error.message}`);
            }
        });
    }
    deleteCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cartman.deleteCart(userId);
                return "Cart deleted successfully";
            }
            catch (error) {
                console.error("Error in CartService deleteCart:", error);
                throw new Error(`Error deleting cart: ${error.message}`);
            }
        });
    }
    addProduct(userId, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.getOrCreateCart(userId);
                yield cartman.addProduct(cart, product_id, quantity);
                const updatedCart = yield this.getCartByUser(userId);
                return updatedCart;
            }
            catch (error) {
                console.error("Error in CartService addProduct:", error);
                throw new Error(`Error adding product: ${error.message}`);
            }
        });
    }
    removeProduct(userId, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.getOrCreateCart(userId);
                yield cartman.removeProduct(cart, product_id, quantity);
                const updatedCart = yield this.getCartByUser(userId);
                return updatedCart;
            }
            catch (error) {
                console.error("Error in CartService removeProduct:", error);
                throw new Error(`Error removing product: ${error.message}`);
            }
        });
    }
    getCartByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cartman.getCartByUser(userId);
                return cart;
            }
            catch (error) {
                console.error("Error fetching cart :", error);
                throw new Error(`Error fetching cart: ${error.message}`);
            }
        });
    }
    getOrCreateCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cart = yield this.getCartByUser(userId);
                if (!cart) {
                    cart = yield this.createCart(userId);
                }
                return cart;
            }
            catch (error) {
                console.error("Error fetching cart:", error);
                throw new Error(`Error fetching cart: ${error.message}`);
            }
        });
    }
}
exports.CartService = CartService;
