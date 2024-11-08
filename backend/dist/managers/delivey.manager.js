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
exports.DeliveryManager = void 0;
const delivery_model_1 = require("../DAO/models/delivery_model");
const user_model_1 = require("../DAO/models/user_model");
class DeliveryManager {
    create_delivery(userId, purchaseid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.UserModel.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                const newDelivery = yield delivery_model_1.DeliveryModel.create({
                    purchase: purchaseid,
                    delivery_address: user.adress || user.email,
                    delivery_status: "Pending",
                });
                const populatedDelivery = yield delivery_model_1.DeliveryModel.findById(newDelivery._id)
                    .populate("purchase")
                    .exec();
                return populatedDelivery;
            }
            catch (error) {
                console.error("Error in DeliveryManager create_delivery:", error);
                throw new Error(`Error creating delivery: ${error.message}`);
            }
        });
    }
    getDeliveries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveries = yield delivery_model_1.DeliveryModel.find();
                if (!deliveries) {
                    throw new Error("Deliveries not found");
                }
                return deliveries;
            }
            catch (error) {
                console.error("Error in DeliveryManager getDeliveries:", error);
                throw new Error(`Error fetching Deliveries: ${error.message}`);
            }
        });
    }
    changeStatus(delivery_id, delivery_status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDelivery = yield delivery_model_1.DeliveryModel.findByIdAndUpdate(delivery_id, { delivery_status: delivery_status }, {
                    new: true,
                    runValidators: true,
                });
                return newDelivery;
            }
            catch (error) {
                console.error("Error in DeliveryManager getDeliveries:", error);
                throw new Error(`Error fetching Deliveries: ${error.message}`);
            }
        });
    }
}
exports.DeliveryManager = DeliveryManager;
