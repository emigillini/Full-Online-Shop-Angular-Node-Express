import { ConversationManager } from "../managers/conversation.manager";
import { Types } from "mongoose";
import { IConversation } from "../types/types";

const conversationman = new ConversationManager();

export class ConversationService {
  async createConversation(
    userId: Types.ObjectId,
    name: string
  ): Promise<IConversation> {
    try {
      const conversation = await conversationman.createConversation(
        userId,
        name
      );
      return conversation;
    } catch (error) {
      console.error("Error in ConversationService create Conversation:", error);
      throw new Error(`Error creating conversation: ${error.message}`);
    }
  }
  async getUserConversations(userId: Types.ObjectId): Promise<IConversation[]> {
    try {
      return await conversationman.getUserConversations(userId);
    } catch (error) {
      console.error("Error in ConversationService getAllConversations:", error);
      throw new Error(`Error fetching conversations: ${error.message}`);
    }
  }
  async getAllConversations(): Promise<IConversation[]> {
    try {
      return await conversationman.getAllConversations();
    } catch (error) {
      console.error("Error in ConversationService getAllConversations:", error);
      throw new Error(`Error fetching conversations: ${error.message}`);
    }
  }
  async getConversationById(
    conversationId: string
  ): Promise<IConversation | null> {
    try {
      return await conversationman.getConversationById(conversationId);
    } catch (error) {
      console.error("Error in ConversationService getConversationById:", error);
      throw new Error(`Error fetching conversation: ${error.message}`);
    }
  }
  async deleteConversation(conversationId: string): Promise<string> {
    try {
      return await conversationman.deleteConversation(conversationId);
    } catch (error) {
      console.error("Error in ConversationService deleteConversation:", error);
      throw new Error(`Error deleting conversation: ${error.message}`);
    }
  }

  async closeConversation(
    conversationId: string
  ): Promise<IConversation | null> {
    try {
      return await conversationman.closeConversation(conversationId);
    } catch (error) {
      console.error("Error in ConversationService closeConversation:", error);
      throw new Error(`Error closing conversation: ${error.message}`);
    }
  }
}
