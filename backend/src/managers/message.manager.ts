import { IMessage } from '../types/types';
import { MessageModel } from '../DAO/models/message_model';
import { Types } from 'mongoose';

export class MessageManager {


    async getAllMessages(): Promise<IMessage[]> {
        try {
            return await MessageModel.find().populate("conversation").populate("sender").exec();
        } catch (error) {
            console.error("Error in MessageManager getAllMessages:", error);
            throw new Error(`Error retrieving messages: ${error.message}`);
        }
    }
    async getMessagesByConversation(conversationId: string): Promise<IMessage[]> {
        try {
            return await MessageModel.find({ conversation: conversationId }).exec();
        } catch (error) {
            console.error("Error in MessageManager getMessagesByConversation:", error);
            throw new Error(`Error retrieving messages for conversation: ${error.message}`);
        }
    }

 
    async createMessage(conversation: Types.ObjectId, sender: Types.ObjectId, content: string): Promise<IMessage> {
        try {
            const newMessage = await MessageModel.create({
                conversation,
                sender,
                content,
            });
           
            const populatedMessage= await MessageModel.findById(newMessage._id).populate("conversation").populate("sender").exec()
            return populatedMessage
        } catch (error) {
            console.error("Error in MessageManager createMessage:", error);
            throw new Error(`Error creating message: ${error.message}`);
        }
    }


    async deleteMessage(id: string): Promise<string> {
        try {
            await MessageModel.deleteOne({ _id: id }).exec();
            return "Message Deleted";
        } catch (error) {
            console.error("Error in MessageManager deleteMessage:", error);
            throw new Error(`Error deleting message: ${error.message}`);
        }
    }
}
