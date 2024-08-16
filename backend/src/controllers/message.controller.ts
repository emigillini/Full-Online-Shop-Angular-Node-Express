import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';
import { IUser } from '../types/types';

const messageService = new MessageService();

export class MessageController {
  
    async getAllMessages(req: Request, res: Response): Promise<void> {
        try {
            const conversationId = req.query.conversationId as string;
            if (conversationId) {
                // Fetch messages for a specific conversation
                const messages = await messageService.getMessagesByConversation(conversationId);
                res.status(200).json(messages);
            }else {
                // Fetch all messages (you might want to paginate this)
                const messages = await messageService.getAllMessages();
                res.status(200).json(messages);
            }
            
        } catch (error) {
            console.error("Error in MessageController getAllMessages:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async createMessage(req: Request, res: Response): Promise<void> {
        try {
            const sender =req.user as IUser
            const conversationId = req.body.conversationId;
            const content  = req.body.content;
            if (!conversationId || !content) {
                res.status(400).json({ message: "conversationId and content are required" });
                return;
            }
            if (!sender) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const newMessage = await messageService.createMessage(conversationId, sender._id, content);
            res.status(201).json({ message: "Message created successfully", newMessage:newMessage });
        } catch (error) {
            console.error("Error in MessageController createMessage:", error);
            res.status(500).json({ message: error.message });
        }
    }


    async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const id  = req.params.id;
            if (!id) {
                res.status(400).json({ message: "Message ID is required" });
                return;
            }
             await messageService.deleteMessage(id);
            
            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            console.error("Error in MessageController deleteMessage:", error);
            res.status(500).json({ message: error.message });
        }
    }
}
