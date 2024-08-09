import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import passport from 'passport';

const userRoutes = Router();
const userCont = new UserController()

userRoutes.post('/register', userCont.register);
userRoutes.post('/login', userCont.login);
userRoutes.post('/logout', passport.authenticate('jwt', { session: false }), userCont.logout); 
userRoutes.get('/users', passport.authenticate('jwt', { session: false }), userCont.getUsers); 
userRoutes.get('/', passport.authenticate('jwt', { session: false }), userCont.getUser); 
userRoutes.patch('/update', passport.authenticate('jwt', { session: false }), userCont.updateUser); 

export default userRoutes;