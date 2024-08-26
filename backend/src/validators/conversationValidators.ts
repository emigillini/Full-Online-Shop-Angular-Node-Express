import { body, param } from 'express-validator';

export const createConversationValidators = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim().isLength({ min: 1 }).withMessage('Name cannot be empty')
];

export const conversationIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid conversation ID')
];

