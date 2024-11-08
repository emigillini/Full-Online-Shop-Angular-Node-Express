"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const passport_1 = __importDefault(require("passport"));
const admin_1 = require("../middlewares/admin");
const messageValidators_1 = require("../validators/messageValidators");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const messageRoutes = (0, express_1.Router)();
const messageCont = new message_controller_1.MessageController();
messageRoutes.get("/", passport_1.default.authenticate("jwt", { session: false }), messageValidators_1.validateGetAllMessages, validationErrorHandler_1.validationErrorHandler, messageCont.getAllMessages);
messageRoutes.post("/", passport_1.default.authenticate("jwt", { session: false }), messageValidators_1.validateCreateMessage, validationErrorHandler_1.validationErrorHandler, messageCont.createMessage);
messageRoutes.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), admin_1.adminOnly, messageValidators_1.validateDeleteMessage, validationErrorHandler_1.validationErrorHandler, messageCont.deleteMessage);
exports.default = messageRoutes;
