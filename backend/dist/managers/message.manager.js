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
exports.MessageManager = void 0;
const message_model_1 = require("../DAO/models/message_model");
class MessageManager {
    getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield message_model_1.MessageModel.find()
                    .populate("conversation")
                    .populate("user")
                    .exec();
            }
            catch (error) {
                console.error("Error in MessageManager getAllMessages:", error);
                throw new Error(`Error retrieving messages: ${error.message}`);
            }
        });
    }
    getMessagesByConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield message_model_1.MessageModel.find({ conversation: conversationId })
                    .populate("conversation")
                    .populate("user")
                    .exec();
            }
            catch (error) {
                console.error("Error in MessageManager getMessagesByConversation:", error);
                throw new Error(`Error retrieving messages for conversation: ${error.message}`);
            }
        });
    }
    createMessage(conversation, user, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield message_model_1.MessageModel.create({
                    conversation,
                    user,
                    content,
                });
                const populatedMessage = yield message_model_1.MessageModel.findById(newMessage._id)
                    .populate("conversation")
                    .populate("user")
                    .exec();
                return populatedMessage;
            }
            catch (error) {
                console.error("Error in MessageManager createMessage:", error);
                throw new Error(`Error creating message: ${error.message}`);
            }
        });
    }
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield message_model_1.MessageModel.deleteOne({ _id: id }).exec();
                return "Message Deleted";
            }
            catch (error) {
                console.error("Error in MessageManager deleteMessage:", error);
                throw new Error(`Error deleting message: ${error.message}`);
            }
        });
    }
}
exports.MessageManager = MessageManager;
