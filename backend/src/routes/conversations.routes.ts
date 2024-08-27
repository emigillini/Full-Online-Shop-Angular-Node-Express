import { Router } from "express";
import { adminOnly } from "../middlewares/admin";
import { ConversationController } from "../controllers/conversation.controller";
import {
  createConversationValidators,
  conversationIdValidator,
} from "../validators/conversationValidators";
import { validationErrorHandler } from "../middlewares/validationErrorHandler";
import passport from "passport";

const conversationRoutes = Router();
const conversationCont = new ConversationController();

conversationRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createConversationValidators,
  validationErrorHandler,
  conversationCont.createConversation
);

conversationRoutes.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  validationErrorHandler,
  conversationCont.getUserConversations
);

conversationRoutes.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  conversationCont.getAllConversations
);
conversationRoutes.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  conversationIdValidator,
  validationErrorHandler,
  conversationCont.getById
);

conversationRoutes.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  conversationIdValidator,
  validationErrorHandler,
  conversationCont.deleteConversation
);
conversationRoutes.post(
  "/:id/close",
  passport.authenticate("jwt", { session: false }),
  adminOnly,
  conversationIdValidator,
  validationErrorHandler,
  conversationCont.closeConversation
);

export default conversationRoutes;
