import { IConversation} from "../types/types";
import { ConversationModel } from "../DAO/models/conversation_model";
import { Types } from "mongoose";

export class ConversationManager {

    async createConversation(userId: Types.ObjectId, name:string): Promise<IConversation> {
        try {
        
            const newConversation = await ConversationModel.create({
                user: userId,
                name: name,
            });
            console.log(newConversation)
            return newConversation;
        } catch (error) {
            console.error("Error in ConversationManager createConversation:", error);
            throw new Error(`Error creating conversation: ${error.message}`);
        }
    }
    async getUserConversations(userId: Types.ObjectId): Promise<IConversation[]> {
        try {
            return await ConversationModel.find({ user: userId }).populate("user").exec();
        } catch (error) {
            console.error("Error in ConversationManager getAllConversations:", error);
            throw new Error(`Error fetching conversations: ${error.message}`);
        }
    }
    async getAllConversations(): Promise<IConversation[]> {
        try {
            return await ConversationModel.find().populate("user").exec();
        } catch (error) {
            console.error("Error in ConversationManager getAllConversations:", error);
            throw new Error(`Error fetching conversations: ${error.message}`);
        }
    }
    async getConversationById(conversationId: string): Promise<IConversation | null> {
        try {
            return await ConversationModel.findById(conversationId).populate("user").exec();
        } catch (error) {
            console.error("Error in ConversationManager getConversationById:", error);
            throw new Error(`Error fetching conversation: ${error.message}`);
        }
    }
    async deleteConversation(conversationId: string): Promise<string> {
        try {
            const result = await ConversationModel.findByIdAndDelete(conversationId);
            
            if (!result) {
                throw new Error('Conversation not found');
            }
            
            return 'Conversation deleted successfully';
        } catch (error) {
            console.error('Error in ConversationManager deleteConversation:', error);
            throw new Error(`Error deleting conversation: ${error.message}`);
        }
    }

    async closeConversation(conversationId: string): Promise<IConversation | null> {
        try {
            return await ConversationModel.findByIdAndUpdate(
                conversationId,
                { open: false, closed_at: new Date() },
                { new: true }
            ).populate("user").exec();
        } catch (error) {
            console.error("Error in ConversationManager closeConversation:", error);
            throw new Error(`Error closing conversation: ${error.message}`);
        }
    }
}
