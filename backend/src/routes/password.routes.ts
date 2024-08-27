import { Router } from "express";
import { PasswordController } from "../controllers/password.controller";

const passwordRoutes = Router();
const passwordController = new PasswordController();

passwordRoutes.post(
  "/reset-password-request",
  passwordController.requestPasswordReset
);
passwordRoutes.post(
  "/reset-password/:uid/:token/",
  passwordController.resetPassword
);

export default passwordRoutes;
