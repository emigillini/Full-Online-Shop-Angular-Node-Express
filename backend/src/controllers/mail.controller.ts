import { Request, Response } from 'express';
import { EmailService } from '../services/mail.service';

export class EmailController {
    async sendEmail(req: Request, res: Response): Promise<void> {
        const { subject, message, toEmail } = req.body;

        if (!subject || !message || !toEmail) {
            res.status(400).json({ status: 'error', message: 'Missing required fields' });
            return;
        }
        try {
            const result = await EmailService.sendEmail(subject, message, toEmail);
            if (result.status === 'success') {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(500).json({ status: 'error', message: result.message });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}