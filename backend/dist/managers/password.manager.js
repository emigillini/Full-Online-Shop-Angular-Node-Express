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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../DAO/models/user_model");
const mail_service_1 = require("../services/mail.service");
const auth_1 = require("../utils/auth");
class PasswordManager {
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            const resetLink = `https://fullexpressangular.netlify.app/reset-password/${user._id}/${token}`;
            const message = `<div>
          <p>Click the link below to reset your password:</p> 
          <p><a href="${resetLink}">${resetLink}</a></p>
        </div>`;
            yield mail_service_1.EmailService.sendEmail("Password Reset Request", message, email);
        });
    }
    resetPassword(uid, token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (decoded.id !== uid) {
                throw new Error("Invalid token");
            }
            const user = yield user_model_1.UserModel.findById(uid);
            if (!user) {
                throw new Error("User not found");
            }
            user.password = yield (0, auth_1.hashPassword)(newPassword);
            yield user.save();
        });
    }
}
exports.PasswordManager = PasswordManager;
