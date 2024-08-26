"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_service_1 = require("../services/message.service");
const messageService = new message_service_1.MessageService();
class MessageController {
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.query.conversation;
                if (conversationId) {
                    const messages = yield messageService.getMessagesByConversation(conversationId);
                    res.status(200).json(messages);
                }
                else {
                    const messages = yield messageService.getAllMessages();
                    res.status(200).json(messages);
                }
            }
            catch (error) {
                console.error("Error in MessageController getAllMessages:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { conversationId, content } = req.body;
                if (!user) {
                    res.status(400).json({ message: "User is not authenticated" });
                    return;
                }
                const newMessage = yield messageService.createMessage(conversationId, user._id, content);
                res.status(201).json(newMessage);
            }
            catch (error) {
                console.error("Error in MessageController createMessage:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield messageService.deleteMessage(id);
                res.status(200).json({ message: "Message deleted successfully" });
            }
            catch (error) {
                console.error("Error in MessageController deleteMessage:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.MessageController = MessageController;
