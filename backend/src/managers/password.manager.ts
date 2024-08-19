
import jwt from 'jsonwebtoken';
import { UserModel } from '../DAO/models/user_model';
import { EmailService } from '../services/mail.service';
import { hashPassword } from '../utils/auth';


export class PasswordManager {
 
    async requestPasswordReset(email: string): Promise<void> {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        const resetLink = `http://localhost:4200/reset-password/${user._id}/${token}`;
        const message = `<div>
          <p>Click the link below to reset your password:</p> 
          <p><a href="${resetLink}">${resetLink}</a></p>
        </div>`;
        await EmailService.sendEmail('Password Reset Request', message, email);
    }

    async resetPassword(uid: string,token: string, newPassword: string): Promise<void> {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        if (decoded.id !== uid) {
            throw new Error('Invalid token');
        }

        const user = await UserModel.findById(uid);
        if (!user) {
            throw new Error('User not found');
        }

        user.password = await hashPassword(newPassword);
        await user.save();
    }
}
