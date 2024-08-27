"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const purchase_routes_1 = __importDefault(require("./routes/purchase.routes"));
const delivery_routes_1 = __importDefault(require("./routes/delivery.routes"));
const mail_routes_1 = __importDefault(require("./routes/mail.routes"));
const password_routes_1 = __importDefault(require("./routes/password.routes"));
const conversations_routes_1 = __importDefault(require("./routes/conversations.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const passport_1 = __importDefault(require("./config/passport"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
const allowedOrigins = ['http://localhost:4200', 'https://fullexpressangular.netlify.app'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}));
app.use('/api/products', products_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use('/api/purchase', purchase_routes_1.default);
app.use('/api/deliveries', delivery_routes_1.default);
app.use('/api/send_mail', mail_routes_1.default);
app.use('/api/password', password_routes_1.default);
app.use('/api/conversation', conversations_routes_1.default);
app.use('/api/message', message_routes_1.default);
app.use('/api/brand', brand_routes_1.default);
app.use('/api/payment', payment_routes_1.default);
const PORT = process.env.PORT;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MOONGOSE_CONNECT);
        console.log("Connection to the database successful");
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
});
connectDB();
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
