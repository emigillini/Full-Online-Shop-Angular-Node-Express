"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationsCollection = "conversations";
const ConversationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
    created_at: { type: Date, default: Date.now },
    closed_at: { type: Date, default: null },
    open: { type: Boolean, default: true }
});
ConversationSchema.virtual('messages', {
    ref: 'MessageModel',
    localField: '_id',
    foreignField: 'conversation'
});
ConversationSchema.set('toObject', { virtuals: true });
ConversationSchema.set('toJSON', { virtuals: true });
exports.ConversationModel = mongoose_1.default.model(ConversationsCollection, ConversationSchema);
