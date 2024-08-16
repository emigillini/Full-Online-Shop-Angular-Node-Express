import { Router } from 'express';
import { ConversationController } from '../controllers/conversation.controller';
import passport from 'passport';


const conversationRoutes = Router();
const conversationCont = new ConversationController()

conversationRoutes.get('/user', passport.authenticate('jwt', { session: false }), conversationCont.getAllConversations);
conversationRoutes.get('/all', passport.authenticate('jwt', { session: false }), conversationCont.getUserConversations);
conversationRoutes.post('/', passport.authenticate('jwt', { session: false }), conversationCont.createConversation); 
conversationRoutes.get('/:id', passport.authenticate('jwt', { session: false }), conversationCont.getById); 
conversationRoutes.post('/:id/close', passport.authenticate('jwt', { session: false }), conversationCont.closeConversation);



export default conversationRoutes;