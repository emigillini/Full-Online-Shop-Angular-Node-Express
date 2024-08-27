import { ILoginUser, IRegisterUser } from "../types/auth.types";
import { UserManager } from "../managers/user.manager";
import { IUser } from "../types/types";

const userMan = new UserManager();

export class UserService {
  async registerUser(userData: IRegisterUser) {
    try {
      const user = await userMan.registerUser(userData);
      return user;
    } catch (error) {
      console.error("Error Registering User:", error);
      throw new Error(`Error Registering User : ${error.message}`);
    }
  }

  async authenticateUser(userData: ILoginUser) {
    try {
      const user = await userMan.authenticateUser(userData);
      return user;
    } catch (error) {
      console.error("Error Login User:", error);
      throw new Error(`Error Login User : ${error.message}`);
    }
  }
  async getAllUsers() {
    try {
      return await userMan.getAllUsers();
    } catch (error) {
      console.error("Error Fetching Users:", error);
      throw new Error(`Error Fetching Users: ${error.message}`);
    }
  }

  async updateUser(user: IUser, updateData: Partial<IUser>) {
    try {
      return await userMan.updateUser(user, updateData);
    } catch (error) {
      console.error("Error Fetching Users:", error);
      throw new Error(`Error Fetching Users: ${error.message}`);
    }
  }
}
