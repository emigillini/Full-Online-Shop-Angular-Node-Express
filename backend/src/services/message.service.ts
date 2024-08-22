import { MessageManager } from '../managers/message.manager';
import { Types } from 'mongoose';
import { IMessage } from '../types/types';

const messageManager = new MessageManager();

export class MessageService {


    async getAllMessages(): Promise<IMessage[]> {
        try {
            return await messageManager.getAllMessages();
        } catch (error) {
            console.error("Error in MessageService getAllMessages:", error);
            throw new Error(`Error retrieving messages: ${error.message}`);
        }
    }
    async getMessagesByConversation(conversationId: string): Promise<IMessage[]> {
        try {
            return await messageManager.getMessagesByConversation(conversationId);
        } catch (error) {
            console.error("Error in MessageService getMessagesByConversation:", error);
            throw new Error(`Error retrieving messages for conversation: ${error.message}`);
        }
    }

 
    async createMessage(conversation: Types.ObjectId, user: Types.ObjectId, content: string): Promise<IMessage> {
        try {
            return await messageManager.createMessage(conversation, user, content);
        } catch (error) {
            console.error("Error in MessageService createMessage:", error);
            throw new Error(`Error creating message: ${error.message}`);
        }
    }

    async deleteMessage(id: string): Promise<string> {
        try {
           return await messageManager.deleteMessage(id);
        } catch (error) {
            console.error("Error in MessageService deleteMessage:", error);
            throw new Error(`Error deleting message: ${error.message}`);
        }
    }
}