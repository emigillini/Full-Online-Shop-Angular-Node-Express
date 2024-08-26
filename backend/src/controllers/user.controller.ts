import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ILoginUser, IRegisterUser } from '../types/auth.types';
import { IUser } from '../types/types';

const userServ = new UserService();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: IRegisterUser = req.body;
      const user = await userServ.registerUser(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error in userController: register", error);
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const userData: ILoginUser = req.body;
      const user = await userServ.authenticateUser(userData);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in userController: login", error);
      res.status(400).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(400).json({ message: 'No user is logged in' });
        return;
      }
      res.status(200).json({ message: 'Logout successful', user });
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
      console.error("Error Fetching Users", error);
      res.status(400).json({ message: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      res.status(200).json(user);
    } catch (error) {
      console.error("Error Fetching User", error);
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const updateData = req.body;
      if (!user || !updateData) {
        res.status(400).json({ message: 'Invalid input' });
        return;
      }
      const newUser = await userServ.updateUser(user, updateData);
      if (newUser) {
        res.status(200).json(newUser);
      } else {
        res.status(404).json({ message: 'Error Updating User' });
      }
    } catch (error) {
      console.error("Error Updating User", error);
      res.status(400).json({ message: error.message });
    }
  }
}
