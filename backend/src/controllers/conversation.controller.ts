import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { IUser } from "../types/types";

const conversationService = new ConversationService();

export class ConversationController {
  async createConversation(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const { name } = req.body;

      const conversation = await conversationService.createConversation(
        user._id,
        name
      );
      res.status(200).json(conversation);
    } catch (error) {
      console.error(
        "Error in ConversationController createConversation:",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }

  async getUserConversations(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;

      const conversations = await conversationService.getUserConversations(
        user._id
      );
      res.status(200).json(conversations);
    } catch (error) {
      console.error(
        "Error in ConversationController getUserConversations:",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }

  async getAllConversations(req: Request, res: Response): Promise<void> {
    try {
      const conversations = await conversationService.getAllConversations();
      res.status(200).json(conversations);
    } catch (error) {
      console.error(
        "Error in ConversationController getAllConversations:",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }

  async deleteConversation(req: Request, res: Response): Promise<void> {
    try {
      const conversationId = req.params.id;

      const conversation = await conversationService.deleteConversation(
        conversationId
      );
      res
        .status(200)
        .json({ message: "Conversation deleted successfully", conversation });
    } catch (error) {
      console.error(
        "Error in ConversationController deleteConversation:",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const conversationId = req.params.id;

      const conversation = await conversationService.getConversationById(
        conversationId
      );
      if (!conversation) {
        res.status(404).json({ message: "Conversation not found" });
        return;
      }

      res.status(200).json(conversation);
    } catch (error) {
      console.error("Error in ConversationController getById:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async closeConversation(req: Request, res: Response): Promise<void> {
    try {
      const conversationId = req.params.id;

      const updatedConversation = await conversationService.closeConversation(
        conversationId
      );
      if (!updatedConversation) {
        res.status(404).json({ message: "Conversation not found" });
        return;
      }

      res
        .status(200)
        .json({
          message: "Conversation closed successfully",
          conversation: updatedConversation,
        });
    } catch (error) {
      console.error(
        "Error in ConversationController closeConversation:",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }
}
