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
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersCollection = "users";
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    identification_number: { type: Number, unique: true, sparse: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    phone: { type: String, maxlength: 45 },
    adress: { type: String, maxlength: 45 },
    last_connection: { type: Date, default: Date.now },
});
UserSchema.virtual("conversations", {
    ref: "ConversationModel",
    localField: "_id",
    foreignField: "user",
});
UserSchema.virtual("purchases", {
    ref: "PurchaseModel",
    localField: "_id",
    foreignField: "user",
});
UserSchema.methods.updateLastConnection = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.last_connection = new Date();
        yield this.save();
    });
};
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });
exports.UserModel = mongoose_1.default.model(usersCollection, UserSchema);
