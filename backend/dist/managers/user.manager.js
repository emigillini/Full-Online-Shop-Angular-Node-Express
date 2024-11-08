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
exports.UserManager = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../DAO/models/user_model");
class UserManager {
    constructor() {
        this.saltRounds = 10;
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, this.saltRounds);
                const user = yield user_model_1.UserModel.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
                return user;
            }
            catch (error) {
                throw new Error(`Error registering user: ${error.message}`);
            }
        });
    }
    authenticateUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.UserModel.findOne({ email: userData.email });
                if (!user) {
                    throw new Error("User not found");
                }
                const isMatch = yield bcrypt_1.default.compare(userData.password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid password");
                }
                const expiresIn = "2h";
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn,
                });
                const expirationDate = Math.floor(Date.now() / 1000) + 7200;
                return { user, token, expires_in: expirationDate };
            }
            catch (error) {
                throw new Error(`Error authenticating user: ${error.message}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.UserModel.find().select("-password");
            }
            catch (error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
        });
    }
    updateUser(user, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(user.id, updateData, { new: true }).select("-password");
                return updatedUser;
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
}
exports.UserManager = UserManager;
