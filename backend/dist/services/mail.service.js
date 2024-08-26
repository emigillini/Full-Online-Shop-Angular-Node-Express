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
exports.EmailService = void 0;
const mail_manager_1 = require("../managers/mail.manager");
const mailmanager = new mail_manager_1.EmailManager();
class EmailService {
    static sendEmail(subject, message, toEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mailmanager.sendEmail(subject, message, toEmail);
                return result;
            }
            catch (error) {
                console.error("Error in EmailService sendEmail:", error);
                throw new Error(`Error sending email: ${error.message}`);
            }
        });
    }
}
exports.EmailService = EmailService;
