import { Router } from 'express';
import { EmailController } from '../controllers/mail.controller';

const mailRoutes = Router();
const emailController = new EmailController();

mailRoutes.post('/', emailController.sendEmail);

export default mailRoutes;