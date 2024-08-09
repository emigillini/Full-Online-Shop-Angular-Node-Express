import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ILoginUser, IRegisterUser } from '../types/auth.types';

const userServ = new UserService()

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: IRegisterUser = req.body;
      const user = await userServ.registerUser(userData);
      res.status(201).json(user);
    } catch (error) {
        console.error("Error in userControlle: register", error);
      res.status(400).json({ message: error.message });
    }
  }

   async login(req: Request, res: Response): Promise<void> {
    try {
      const userData:ILoginUser = req.body;
      const user = await userServ.authenticateUser(userData);
      res.status(200).json(user);
    } catch (error) {
        console.error("Error in userController: login", error);
      res.status(400).json({ message: error.message });
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    try {
    const user=  req.user     
      res.status(200).json({ message: 'Logout successful ', user: user });
    } catch (error) {
        console.error("Error in userController: logout", error);
      res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userServ.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}