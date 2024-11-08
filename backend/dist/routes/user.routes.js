"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const passport_1 = __importDefault(require("passport"));
const userValidators_1 = require("../validators/userValidators");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const userRoutes = (0, express_1.Router)();
const userCont = new user_controller_1.UserController();
userRoutes.post("/register", userValidators_1.registerValidators, validationErrorHandler_1.validationErrorHandler, userCont.register);
userRoutes.post("/login", userValidators_1.loginValidators, validationErrorHandler_1.validationErrorHandler, userCont.login);
userRoutes.post("/logout", passport_1.default.authenticate("jwt", { session: false }), userCont.logout);
userRoutes.get("/users", passport_1.default.authenticate("jwt", { session: false }), userCont.getUsers);
userRoutes.get("/", passport_1.default.authenticate("jwt", { session: false }), userCont.getUser);
userRoutes.patch("/update", passport_1.default.authenticate("jwt", { session: false }), userValidators_1.updateUserValidators, validationErrorHandler_1.validationErrorHandler, userCont.updateUser);
exports.default = userRoutes;
