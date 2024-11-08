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
exports.CartManager = void 0;
const cart_model_1 = require("../DAO/models/cart_model");
const product_model_1 = require("../DAO/models/product_model");
class CartManager {
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCart = yield cart_model_1.CartModel.create({
                    user: userId,
                    date: new Date(),
                    products: [],
                });
                return newCart;
            }
            catch (error) {
                console.error("Error in CartManager createCart:", error);
                throw new Error(`Error creating cart: ${error.message}`);
            }
        });
    }
    deleteCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_model_1.CartModel.findOneAndDelete({ user: userId });
                if (!cart) {
                    throw new Error("Cart not found");
                }
                return "cart deleted";
            }
            catch (error) {
                console.error("Error in CartManager deleteCart:", error);
                throw new Error(`Error deleting cart: ${error.message}`);
            }
        });
    }
    addProduct(cart, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.ProductModel.findById(product_id);
                if (!product) {
                    throw new Error("Product not found");
                }
                if (product.stock < quantity) {
                    throw new Error("Insufficient stock");
                }
                const productIndex = cart.products.findIndex((p) => p.product._id.toString() === product_id.toString() || p.product.toString() === product_id.toString());
                if (productIndex > -1) {
                    cart.products[productIndex].quantity += quantity;
                }
                else {
                    const newCartProduct = {
                        product: product_id,
                        quantity,
                    };
                    cart.products.push(newCartProduct);
                }
                yield cart.save();
                return cart;
            }
            catch (error) {
                console.error("Error in CartManager addProduct:", error);
                throw new Error(`Error adding product to cart: ${error.message}`);
            }
        });
    }
    removeProduct(cart, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.ProductModel.findById(product_id);
                if (!product) {
                    throw new Error("Product not found");
                }
                const productIndex = cart.products.findIndex((p) => p.product._id.toString() === product_id.toString() || p.product.toString() === product_id.toString());
                if (productIndex > -1) {
                    if (cart.products[productIndex].quantity <= quantity) {
                        cart.products.splice(productIndex, 1);
                    }
                    else {
                        cart.products[productIndex].quantity -= quantity;
                    }
                    yield cart.save();
                    return cart;
                }
                else {
                    throw new Error("Product not found in cart");
                }
            }
            catch (error) {
                console.error("Error in CartManager removeProduct:", error);
                throw new Error(`Error removing product from cart: ${error.message}`);
            }
        });
    }
    getCartByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_model_1.CartModel.findOne({ user: userId })
                    .sort({ createdAt: -1 })
                    .populate("products.product")
                    .populate({
                    path: 'products.product', // Popula los productos en el carrito
                    populate: { path: 'brand' }, // Popula la marca dentro de los productos
                })
                    .populate("user")
                    .exec();
                return cart;
            }
            catch (error) {
                console.error("Error in CartManager getCartByUser:", error);
                throw new Error(`Error fetching cart by user: ${error.message}`);
            }
        });
    }
}
exports.CartManager = CartManager;
