import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import passport from "passport";
import {
  registerValidators,
  loginValidators,
  updateUserValidators,
} from "../validators/userValidators";
import { validationErrorHandler } from "../middlewares/validationErrorHandler";

const userRoutes = Router();
const userCont = new UserController();

userRoutes.post(
  "/register",
  registerValidators,
  validationErrorHandler,
  userCont.register
);

userRoutes.post(
  "/login",
  loginValidators,
  validationErrorHandler,
  userCont.login
);

userRoutes.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userCont.logout
);

userRoutes.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userCont.getUsers
);

userRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userCont.getUser
);

userRoutes.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  updateUserValidators,
  validationErrorHandler,
  userCont.updateUser
);

export default userRoutes;
