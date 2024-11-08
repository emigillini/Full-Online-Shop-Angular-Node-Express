"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessagesCollection = "messages";
const MessageSchema = new mongoose_1.default.Schema({
    conversation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "conversations",
        required: true,
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});
MessageSchema.set("toObject", { virtuals: true });
MessageSchema.set("toJSON", { virtuals: true });
exports.MessageModel = mongoose_1.default.model(MessagesCollection, MessageSchema);
