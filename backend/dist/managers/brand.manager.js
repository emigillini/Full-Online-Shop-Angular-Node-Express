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
exports.BrandManager = void 0;
const brand_model_1 = require("../DAO/models/brand_model");
class BrandManager {
    getBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brands = yield brand_model_1.BrandModel.find();
                return brands;
            }
            catch (error) {
                console.error("Error in BrandManager getByBrand:", error);
                throw new Error(`Error fetching cart by user: ${error.message}`);
            }
        });
    }
}
exports.BrandManager = BrandManager;
