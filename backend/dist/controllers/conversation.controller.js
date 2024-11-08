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
exports.ConversationController = void 0;
const conversation_service_1 = require("../services/conversation.service");
const conversationService = new conversation_service_1.ConversationService();
class ConversationController {
    createConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { name } = req.body;
                const conversation = yield conversationService.createConversation(user._id, name);
                res.status(200).json(conversation);
            }
            catch (error) {
                console.error("Error in ConversationController createConversation:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getUserConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const conversations = yield conversationService.getUserConversations(user._id);
                res.status(200).json(conversations);
            }
            catch (error) {
                console.error("Error in ConversationController getUserConversations:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAllConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield conversationService.getAllConversations();
                res.status(200).json(conversations);
            }
            catch (error) {
                console.error("Error in ConversationController getAllConversations:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.params.id;
                const conversation = yield conversationService.deleteConversation(conversationId);
                res
                    .status(200)
                    .json({ message: "Conversation deleted successfully", conversation });
            }
            catch (error) {
                console.error("Error in ConversationController deleteConversation:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.params.id;
                const conversation = yield conversationService.getConversationById(conversationId);
                if (!conversation) {
                    res.status(404).json({ message: "Conversation not found" });
                    return;
                }
                res.status(200).json(conversation);
            }
            catch (error) {
                console.error("Error in ConversationController getById:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    closeConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.params.id;
                const updatedConversation = yield conversationService.closeConversation(conversationId);
                if (!updatedConversation) {
                    res.status(404).json({ message: "Conversation not found" });
                    return;
                }
                res
                    .status(200)
                    .json({
                    message: "Conversation closed successfully",
                    conversation: updatedConversation,
                });
            }
            catch (error) {
                console.error("Error in ConversationController closeConversation:", error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ConversationController = ConversationController;
