import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../../types';

const MessagesCollection = "messages";

const MessageSchema: Schema = new mongoose.Schema<IMessage>({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'conversations', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

MessageSchema.set('toObject', { virtuals: true });  
MessageSchema.set('toJSON', { virtuals: true });

export const MessageModel = mongoose.model<IMessage>(MessagesCollection, MessageSchema);