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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://admin:admin@cluster0.spvzvph.mongodb.net/");
        console.log("Connection to the database successful");
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
});
connectDB();
app.get("/api", (req, res) => {
    const hiUser = "Hello New User...";
    res.send(hiUser);
});
app.listen(PORT, () => {
    console.log(`server is running on port  ${PORT}`);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SIGINT signal received: closing MongoDB connection");
    try {
        yield mongoose_1.default.disconnect();
        console.log("Disconnected from the database");
    }
    catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
    finally {
        process.exit(0);
    }
}));
