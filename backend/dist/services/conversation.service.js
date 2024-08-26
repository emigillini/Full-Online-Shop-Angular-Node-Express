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
exports.ConversationService = void 0;
const conversation_manager_1 = require("../managers/conversation.manager");
const conversationman = new conversation_manager_1.ConversationManager();
class ConversationService {
    createConversation(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield conversationman.createConversation(userId, name);
                return conversation;
            }
            catch (error) {
                console.error("Error in ConversationService create Conversation:", error);
                throw new Error(`Error creating conversation: ${error.message}`);
            }
        });
    }
    getUserConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationman.getUserConversations(userId);
            }
            catch (error) {
                console.error("Error in ConversationService getAllConversations:", error);
                throw new Error(`Error fetching conversations: ${error.message}`);
            }
        });
    }
    getAllConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationman.getAllConversations();
            }
            catch (error) {
                console.error("Error in ConversationService getAllConversations:", error);
                throw new Error(`Error fetching conversations: ${error.message}`);
            }
        });
    }
    getConversationById(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationman.getConversationById(conversationId);
            }
            catch (error) {
                console.error("Error in ConversationService getConversationById:", error);
                throw new Error(`Error fetching conversation: ${error.message}`);
            }
        });
    }
    deleteConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationman.deleteConversation(conversationId);
            }
            catch (error) {
                console.error("Error in ConversationService deleteConversation:", error);
                throw new Error(`Error deleting conversation: ${error.message}`);
            }
        });
    }
    closeConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationman.closeConversation(conversationId);
            }
            catch (error) {
                console.error("Error in ConversationService closeConversation:", error);
                throw new Error(`Error closing conversation: ${error.message}`);
            }
        });
    }
}
exports.ConversationService = ConversationService;
