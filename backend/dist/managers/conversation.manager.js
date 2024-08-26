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
exports.ConversationManager = void 0;
const conversation_model_1 = require("../DAO/models/conversation_model");
class ConversationManager {
    createConversation(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newConversation = yield conversation_model_1.ConversationModel.create({
                    user: userId,
                    name: name,
                });
                console.log(newConversation);
                return newConversation;
            }
            catch (error) {
                console.error("Error in ConversationManager createConversation:", error);
                throw new Error(`Error creating conversation: ${error.message}`);
            }
        });
    }
    getUserConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_model_1.ConversationModel.find({ user: userId }).populate("user").exec();
            }
            catch (error) {
                console.error("Error in ConversationManager getAllConversations:", error);
                throw new Error(`Error fetching conversations: ${error.message}`);
            }
        });
    }
    getAllConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_model_1.ConversationModel.find().populate("user").exec();
            }
            catch (error) {
                console.error("Error in ConversationManager getAllConversations:", error);
                throw new Error(`Error fetching conversations: ${error.message}`);
            }
        });
    }
    getConversationById(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_model_1.ConversationModel.findById(conversationId).populate("user").exec();
            }
            catch (error) {
                console.error("Error in ConversationManager getConversationById:", error);
                throw new Error(`Error fetching conversation: ${error.message}`);
            }
        });
    }
    deleteConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield conversation_model_1.ConversationModel.findByIdAndDelete(conversationId);
                if (!result) {
                    throw new Error('Conversation not found');
                }
                return 'Conversation deleted successfully';
            }
            catch (error) {
                console.error('Error in ConversationManager deleteConversation:', error);
                throw new Error(`Error deleting conversation: ${error.message}`);
            }
        });
    }
    closeConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_model_1.ConversationModel.findByIdAndUpdate(conversationId, { open: false, closed_at: new Date() }, { new: true }).populate("user").exec();
            }
            catch (error) {
                console.error("Error in ConversationManager closeConversation:", error);
                throw new Error(`Error closing conversation: ${error.message}`);
            }
        });
    }
}
exports.ConversationManager = ConversationManager;
