import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../DAO/models/user_model';
import { IRegisterUser, ILoginUser } from '../types/auth.types';
import { IUser } from '../types/types';

export class UserManager {
  private saltRounds: number = 10;

  async registerUser(userData: IRegisterUser) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);
      const user = new UserModel({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }

  async authenticateUser(userData: ILoginUser) {
    try {
      const user = await UserModel.findOne({ email: userData.email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await bcrypt.compare(userData.password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return { user, token };
    } catch (error) {
      throw new Error(`Error authenticating user: ${error.message}`);
    }
  }
  
  async getAllUsers() {
    try {
      return await UserModel.find().select('-password'); 
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
  async updateUser(user:IUser, updateData:Partial<IUser>) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(user.id, updateData, { new: true }).select('-password');
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
}