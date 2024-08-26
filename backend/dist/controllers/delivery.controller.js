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
exports.DeliveryController = void 0;
const delivery_service_1 = require("../services/delivery.service");
class DeliveryController {
    getDeliveries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveries = yield delivery_service_1.DeliveryService.getDeliveries();
                res.status(200).json(deliveries);
            }
            catch (error) {
                console.error("Error in DeliveryController getDeliveries:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const delivery_id = req.body.delivery_id;
                const delivery_status = req.body.delivery_status;
                const newStatus = yield delivery_service_1.DeliveryService.changeStatus(delivery_id, delivery_status);
                res.status(200).json(newStatus);
            }
            catch (error) {
                console.error("Error in DeliveryController changeStatus:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.DeliveryController = DeliveryController;
