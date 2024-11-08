"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordController = void 0;
const password_service_1 = require("../services/password.service");
const passwordservice = new password_service_1.PasswordService();
class PasswordController {
    requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                yield passwordservice.requestPasswordReset(email);
                res
                    .status(200)
                    .json({
                    message: "If an account with that email exists, a reset link has been sent.",
                });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { new_password, confirm_password } = req.body;
            const uid = req.params.uid;
            const token = req.params.token;
            try {
                yield passwordservice.resetPassword(uid, token, new_password);
                res.status(200).json({ message: "Password has been reset" });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.PasswordController = PasswordController;
