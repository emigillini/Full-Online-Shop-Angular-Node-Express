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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userServ = new user_service_1.UserService();
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const user = yield userServ.registerUser(userData);
                res.status(201).json(user);
            }
            catch (error) {
                console.error("Error in userController: register", error);
                res.status(400).json({ message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const user = yield userServ.authenticateUser(userData);
                res.status(200).json(user);
            }
            catch (error) {
                console.error("Error in userController: login", error);
                res.status(400).json({ message: error.message });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(400).json({ message: "No user is logged in" });
                    return;
                }
                res.status(200).json({ message: "Logout successful", user });
            }
            catch (error) {
                console.error("Error in userController: logout", error);
                res.status(400).json({ message: error.message });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userServ.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                console.error("Error Fetching Users", error);
                res.status(400).json({ message: error.message });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                res.status(200).json(user);
            }
            catch (error) {
                console.error("Error Fetching User", error);
                res.status(400).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const updateData = req.body;
                if (!user || !updateData) {
                    res.status(400).json({ message: "Invalid input" });
                    return;
                }
                const newUser = yield userServ.updateUser(user, updateData);
                if (newUser) {
                    res.status(200).json(newUser);
                }
                else {
                    res.status(404).json({ message: "Error Updating User" });
                }
            }
            catch (error) {
                console.error("Error Updating User", error);
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
