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
exports.DeliveryService = void 0;
const delivey_manager_1 = require("../managers/delivey.manager");
const deliveryman = new delivey_manager_1.DeliveryManager();
class DeliveryService {
    static create_delivery(userId, purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const delivery = yield deliveryman.create_delivery(userId, purchaseId);
                return delivery;
            }
            catch (error) {
                console.error("Error in DeliveryService create_delivery:", error);
                throw new Error(`Error creating Delivery: ${error.message}`);
            }
        });
    }
    static getDeliveries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveries = yield deliveryman.getDeliveries();
                return deliveries;
            }
            catch (error) {
                console.error("Error in DeliveryService create_delivery:", error);
                throw new Error(`Error creating Delivery: ${error.message}`);
            }
        });
    }
    static changeStatus(delivery_id, delivery_status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const delivery = yield deliveryman.changeStatus(delivery_id, delivery_status);
                return delivery;
            }
            catch (error) {
                console.error("Error in DeliveryService create_delivery:", error);
                throw new Error(`Error creating Delivery: ${error.message}`);
            }
        });
    }
}
exports.DeliveryService = DeliveryService;
