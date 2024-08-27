import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import passport from "passport";
import { adminOnly } from "../middlewares/admin";
import {
  validateGetAllMessages,
  validateCreateMessage,
  validateDeleteMessage,
} from "../validators/messageValidators";
import { validationErrorHandler } from "../middlewares/validationErrorHandler";

const messageRoutes = Router();
const messageCont = new MessageController();

messageRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateGetAllMessages,
  validationErrorHandler,
  messageCont.getAllMessages
);

messageRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateCreateMessage,
  validationErrorHandler,
  messageCont.createMessage
);

messageRoutes.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminOnly,
  validateDeleteMessage,
  validationErrorHandler,
  messageCont.deleteMessage
);

export default messageRoutes;
