import { Router } from "express";
import { EmailController } from "../controllers/mail.controller";
import { emailValidation } from "../validators/mailValidators";
import { validationErrorHandler } from "../middlewares/validationErrorHandler";

const mailRoutes = Router();
const emailController = new EmailController();

mailRoutes.post(
  "/",
  emailValidation,
  validationErrorHandler,
  emailController.sendEmail
);

export default mailRoutes;
