import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";

const brandRoutes = Router();
const brandCont = new BrandController();

brandRoutes.get("/", brandCont.getBrands);

export default brandRoutes;
