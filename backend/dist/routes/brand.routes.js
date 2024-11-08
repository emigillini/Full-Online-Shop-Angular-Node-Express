"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = require("../controllers/brand.controller");
const brandRoutes = (0, express_1.Router)();
const brandCont = new brand_controller_1.BrandController();
brandRoutes.get("/", brandCont.getBrands);
exports.default = brandRoutes;
