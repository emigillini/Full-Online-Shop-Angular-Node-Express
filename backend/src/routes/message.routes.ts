import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import passport from 'passport';


const messageRoutes = Router();
const messageCont = new MessageController()


messageRoutes.get('/messages', passport.authenticate('jwt', { session: false }), messageCont.getAllMessages);
messageRoutes.post('/messages', passport.authenticate('jwt', { session: false }), messageCont.createMessage); 
messageRoutes.delete('/messages/:id', passport.authenticate('jwt', { session: false }), messageCont.deleteMessage);   



export default messageRoutes;