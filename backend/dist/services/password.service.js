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
exports.PasswordService = void 0;
const password_manager_1 = require("../managers/password.manager");
const passwordmanager = new password_manager_1.PasswordManager();
class PasswordService {
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield passwordmanager.requestPasswordReset(email);
            }
            catch (error) {
                console.error("Error in PasswordService requestPasswordReset:", error);
                throw new Error(`Error requesting password reset: ${error.message}`);
            }
        });
    }
    resetPassword(uid, token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield passwordmanager.resetPassword(uid, token, newPassword);
            }
            catch (error) {
                console.error("Error in PasswordService resetPassword:", error);
                throw new Error(`Error resetting password: ${error.message}`);
            }
        });
    }
}
exports.PasswordService = PasswordService;
