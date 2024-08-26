import { body, query, param } from 'express-validator';

export const validateGetAllMessages = [
    query('conversation')
        .optional()
        .isString()
        .withMessage('Conversation ID must be a string')
];

export const validateCreateMessage = [
    body('conversationId')
        .notEmpty()
        .withMessage('Conversation ID is required')
        .isString()
        .withMessage('Conversation ID must be a string'),
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isString()
        .withMessage('Content must be a string')
];

export const validateDeleteMessage = [
    param('id')
        .notEmpty()
        .withMessage('Message ID is required')
        .isString()
        .withMessage('Message ID must be a string')
];
