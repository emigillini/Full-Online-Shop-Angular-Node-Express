import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../DAO/models/user_model';
import { IRegisterUser, ILoginUser } from '../types/auth.types';

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
      return await UserModel.find().select('-password'); // Excluye el campo de la contraseña
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}
