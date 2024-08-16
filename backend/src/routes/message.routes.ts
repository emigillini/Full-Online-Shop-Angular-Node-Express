import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import passport from 'passport';


const messageRoutes = Router();
const messageCont = new MessageController()


messageRoutes.get('/', passport.authenticate('jwt', { session: false }), messageCont.getAllMessages);
messageRoutes.post('/', passport.authenticate('jwt', { session: false }), messageCont.createMessage); 
messageRoutes.delete('/:id', passport.authenticate('jwt', { session: false }), messageCont.deleteMessage);   



export default messageRoutes;