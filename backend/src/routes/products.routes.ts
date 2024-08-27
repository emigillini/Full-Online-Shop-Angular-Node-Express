import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { filterMiddleware } from "../middlewares/productFilter";
import passport from "passport";
import { adminOnly } from "../middlewares/admin";
import {
  addProductValidators,
  modifyProductValidators,
  brandNameValidator,
} from "../validators/productValidators";
import { param } from "express-validator";
import { validationErrorHandler } from "../middlewares/validationErrorHandler";

const productRoutes = Router();
const prodCont = new ProductController();

productRoutes.get(
  "/get_random_product_excluding_id",
  prodCont.get_random_product_excluding_id
);

productRoutes.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminOnly,
  modifyProductValidators,
  validationErrorHandler,
  prodCont.modifiedProduct
);

productRoutes.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid product ID"),
  validationErrorHandler,
  prodCont.getProductByIds
);

productRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminOnly,
  addProductValidators,
  validationErrorHandler,
  prodCont.addProduct
);

productRoutes.get("/", filterMiddleware, prodCont.getAllProducts);

productRoutes.get(
  "/brand/:brandName",
  brandNameValidator,
  validationErrorHandler,
  prodCont.getProductsByBrandName
);

export default productRoutes;
