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
exports.MessageService = void 0;
const message_manager_1 = require("../managers/message.manager");
const messageManager = new message_manager_1.MessageManager();
class MessageService {
    getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageManager.getAllMessages();
            }
            catch (error) {
                console.error("Error in MessageService getAllMessages:", error);
                throw new Error(`Error retrieving messages: ${error.message}`);
            }
        });
    }
    getMessagesByConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageManager.getMessagesByConversation(conversationId);
            }
            catch (error) {
                console.error("Error in MessageService getMessagesByConversation:", error);
                throw new Error(`Error retrieving messages for conversation: ${error.message}`);
            }
        });
    }
    createMessage(conversation, user, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageManager.createMessage(conversation, user, content);
            }
            catch (error) {
                console.error("Error in MessageService createMessage:", error);
                throw new Error(`Error creating message: ${error.message}`);
            }
        });
    }
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageManager.deleteMessage(id);
            }
            catch (error) {
                console.error("Error in MessageService deleteMessage:", error);
                throw new Error(`Error deleting message: ${error.message}`);
            }
        });
    }
}
exports.MessageService = MessageService;
