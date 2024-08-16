import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { IUser } from "../types/types";
import { Types } from "mongoose";



const conversationserv= new ConversationService()

export class ConversationController {
 
    async createConversation(req: Request, res: Response): Promise<void> {
        try {
            const user= req.user as IUser 
            const name = req.body.name
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            if (!name) {
                res.status(400).json({ message: "Name is required" });
                return;
            }
            const conversation= await conversationserv.createConversation(user._id, name); 
            res.status(200).json({message:"conversation created successfully", conversation:conversation});

        } catch (error) {
            console.error("Error in ConversationController create:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getUserConversations(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user as IUser;
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const conversations = await conversationserv.getUserConversations(user._id);
            res.status(200).json(conversations);
        } catch (error) {
            console.error("Error in ConversationController getAllConversations:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getAllConversations(req: Request, res: Response): Promise<void> {
        try {
            
            const conversations = await conversationserv.getAllConversations();
            res.status(200).json(conversations);
        } catch (error) {
            console.error("Error in ConversationController getAllConversations:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const conversationId = req.params.id;
            if (!conversationId) {
                res.status(400).json({ message: 'Conversation ID is required' });
                return;
            }
            const conversation = await conversationserv.getConversationById(conversationId);
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
            if (!conversationId) {
                res.status(400).json({ message: 'Conversation ID is required' });
                return;
            }
            const updatedConversation = await conversationserv.closeConversation(conversationId);
            if (!updatedConversation) {
                res.status(404).json({ message: "Conversation not found" });
                return;
            }
            res.status(200).json({ message: "Conversation closed successfully", conversation: updatedConversation });
        } catch (error) {
            console.error("Error in ConversationController closeConversation:", error);
            res.status(500).json({ message: error.message });
        }
    }
}