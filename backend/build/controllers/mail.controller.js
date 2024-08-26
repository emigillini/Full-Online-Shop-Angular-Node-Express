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
exports.EmailController = void 0;
const mail_service_1 = require("../services/mail.service");
class EmailController {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subject, message, toEmail } = req.body;
            try {
                const result = yield mail_service_1.EmailService.sendEmail(subject, message, toEmail);
                if (result.status === 'success') {
                    res.status(200).json({ status: 'success' });
                }
                else {
                    res.status(500).json({ status: 'error', message: result.message });
                }
            }
            catch (error) {
                res.status(500).json({ status: 'error', message: error.message });
            }
        });
    }
}
exports.EmailController = EmailController;
