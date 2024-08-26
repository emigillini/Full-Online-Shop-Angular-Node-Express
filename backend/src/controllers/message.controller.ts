import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';
import { IUser } from '../types/types';

const messageService = new MessageService();

export class MessageController {

    async getAllMessages(req: Request, res: Response): Promise<void> {
        try {
            const conversationId = req.query.conversation as string;
            if (conversationId) {
              
                const messages = await messageService.getMessagesByConversation(conversationId);
                res.status(200).json(messages);
            } else {
                
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
            const user = req.user as IUser;
            const { conversationId, content } = req.body;

            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }

            const newMessage = await messageService.createMessage(conversationId, user._id, content);
            res.status(201).json(newMessage);
        } catch (error) {
            console.error("Error in MessageController createMessage:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;

            await messageService.deleteMessage(id);

            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            console.error("Error in MessageController deleteMessage:", error);
            res.status(500).json({ message: error.message });
        }
    }
}
