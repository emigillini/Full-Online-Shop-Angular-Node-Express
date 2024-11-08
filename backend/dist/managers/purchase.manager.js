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
exports.PurchaseManager = void 0;
const purchase_model_1 = require("../DAO/models/purchase_model");
const cart_model_1 = require("../DAO/models/cart_model");
const product_model_1 = require("../DAO/models/product_model");
const stripe_service_1 = require("../services/stripe.service");
const delivery_service_1 = require("../services/delivery.service");
const utils_1 = require("../utils/utils");
const cart_service_1 = require("../services/cart.service");
const payment_model_1 = require("../DAO/models/payment_model");
const cartservice = new cart_service_1.CartService();
class PurchaseManager {
    create_purchase(userId, paymentType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentModeType = yield payment_model_1.PaymentModel.findOne({
                    description: paymentType,
                }).exec();
                console.log(paymentModeType);
                if (!paymentModeType) {
                    throw new Error("Payment type not found");
                }
                const paymentTypeId = paymentModeType._id;
                console.log(paymentTypeId);
                const cart = yield cart_model_1.CartModel.findOne({ user: userId })
                    .sort({ createdAt: -1 })
                    .populate("products.product")
                    .exec();
                if (!cart) {
                    throw new Error("Cart not found");
                }
                if (cart.products.length === 0) {
                    throw new Error("No products in Cart");
                }
                for (const item of cart.products) {
                    const product = item.product;
                    if (product.stock < item.quantity) {
                        throw new Error(`Insufficient stock for product ${product._id}`);
                    }
                    yield product_model_1.ProductModel.updateOne({ _id: product._id }, { $inc: { stock: -item.quantity } });
                }
                const totalPrice = (0, utils_1.calculateTotalPrice)(cart);
                if (paymentType === "Stripe") {
                    const paymentMethodId = "pm_card_visa";
                    const amountInCents = totalPrice * 100;
                    const paymentIntent = yield stripe_service_1.StripeService.createPaymentIntent(amountInCents);
                    const confirmedIntent = yield stripe_service_1.StripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
                    if (confirmedIntent.status !== "succeeded") {
                        throw new Error("Payment failed: " + confirmedIntent.status);
                    }
                }
                else if (paymentType === "Cash") {
                }
                else {
                    throw new Error("Unsupported payment method");
                }
                const newPurchase = yield purchase_model_1.PurchaseModel.create({
                    user: userId,
                    paymentType: paymentTypeId,
                    cart: cart._id,
                    total: totalPrice,
                });
                const delivery = yield delivery_service_1.DeliveryService.create_delivery(userId, newPurchase._id);
                const populatedPurchase = yield purchase_model_1.PurchaseModel.findByIdAndUpdate(newPurchase._id, { delivery: delivery._id }, { new: true })
                    .populate("user")
                    .populate({
                    path: "cart",
                    populate: {
                        path: "products.product", // Poblamos el producto
                        model: "products",
                        populate: {
                            path: "brand", // Poblamos la marca del producto
                            model: "brands"
                        }
                    }
                })
                    .populate({
                    path: "cart",
                    populate: {
                        path: "user",
                        model: "users",
                    },
                })
                    .populate("delivery")
                    .exec();
                yield cartservice.createCart(userId);
                return { purchase: populatedPurchase, delivery: delivery };
            }
            catch (error) {
                console.error("Error creating purchase:", error);
                throw new Error("Failed create Purchase");
            }
        });
    }
    user_purchases(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield purchase_model_1.PurchaseModel.find({ user: userId })
                    .populate("delivery")
                    .populate("cart")
                    .populate({
                    path: "cart",
                    populate: {
                        path: "products.product",
                        model: "products",
                    },
                })
                    .populate({
                    path: "cart",
                    populate: {
                        path: "products.product",
                        model: "products",
                    },
                })
                    .exec();
                return purchases;
            }
            catch (error) {
                console.error("Error fetching user purchases:", error);
                throw new Error("Failed to fetch user purchases");
            }
        });
    }
    get_purchases() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield purchase_model_1.PurchaseModel.find()
                    .populate("user")
                    .populate({
                    path: "cart",
                    populate: {
                        path: "products.product",
                        model: "products",
                    },
                })
                    .exec();
                return purchases;
            }
            catch (error) {
                console.error("Error fetching purchases:", error);
                throw new Error("fetching purchases");
            }
        });
    }
}
exports.PurchaseManager = PurchaseManager;
