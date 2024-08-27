import { PasswordManager } from "../managers/password.manager";

const passwordmanager = new PasswordManager();

export class PasswordService {
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await passwordmanager.requestPasswordReset(email);
    } catch (error) {
      console.error("Error in PasswordService requestPasswordReset:", error);
      throw new Error(`Error requesting password reset: ${error.message}`);
    }
  }
  async resetPassword(
    uid: string,
    token: string,
    newPassword: string
  ): Promise<void> {
    try {
      await passwordmanager.resetPassword(uid, token, newPassword);
    } catch (error) {
      console.error("Error in PasswordService resetPassword:", error);
      throw new Error(`Error resetting password: ${error.message}`);
    }
  }
}
