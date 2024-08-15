import { EmailManager } from "../managers/mail.manager";

const mailmanager= new EmailManager()

export class EmailService {
 
    static async sendEmail(subject: string, message: string, toEmail: string): Promise<{ status: string, message?: string }> {
        try {
            const result = await mailmanager.sendEmail(subject, message, toEmail);
            return result;
        } catch (error) {
            console.error("Error in EmailService sendEmail:", error);
            throw new Error(`Error sending email: ${error.message}`);
        }
    }
}


