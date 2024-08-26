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
exports.UserService = void 0;
const user_manager_1 = require("../managers/user.manager");
const userMan = new user_manager_1.UserManager();
class UserService {
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userMan.registerUser(userData);
                return user;
            }
            catch (error) {
                console.error("Error Registering User:", error);
                throw new Error(`Error Registering User : ${error.message}`);
            }
        });
    }
    authenticateUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userMan.authenticateUser(userData);
                return user;
            }
            catch (error) {
                console.error("Error Login User:", error);
                throw new Error(`Error Login User : ${error.message}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userMan.getAllUsers();
            }
            catch (error) {
                console.error('Error Fetching Users:', error);
                throw new Error(`Error Fetching Users: ${error.message}`);
            }
        });
    }
    updateUser(user, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userMan.updateUser(user, updateData);
            }
            catch (error) {
                console.error('Error Fetching Users:', error);
                throw new Error(`Error Fetching Users: ${error.message}`);
            }
        });
    }
}
exports.UserService = UserService;
