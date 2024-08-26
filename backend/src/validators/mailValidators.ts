import { body} from 'express-validator';

export const emailValidation = [
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('toEmail').isEmail().withMessage('Valid email is required')
];
