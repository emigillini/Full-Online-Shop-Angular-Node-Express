import mongoose, { Schema } from 'mongoose';
import { IConversation } from '../../types';

const ConversationsCollection = "conversations";

const ConversationSchema: Schema = new mongoose.Schema<IConversation>({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    created_at: { type: Date, default: Date.now },
    closed_at: { type: Date, default: null },
    open: { type: Boolean, default: true }
}, { timestamps: true });

ConversationSchema.virtual('messages', {
    ref: 'MessageModel',
    localField: '_id',
    foreignField: 'conversation'
});

export const ConversationModel = mongoose.model<IConversation>(ConversationsCollection, ConversationSchema);
