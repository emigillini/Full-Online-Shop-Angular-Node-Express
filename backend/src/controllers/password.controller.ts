import { Request, Response } from "express";
import { PasswordService } from "../services/password.service";

const passwordservice = new PasswordService();
export class PasswordController {
  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    try {
      await passwordservice.requestPasswordReset(email);
      res
        .status(200)
        .json({
          message:
            "If an account with that email exists, a reset link has been sent.",
        });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { new_password, confirm_password } = req.body;
    const uid = req.params.uid;
    const token = req.params.token;
    try {
      await passwordservice.resetPassword(uid, token, new_password);
      res.status(200).json({ message: "Password has been reset" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
