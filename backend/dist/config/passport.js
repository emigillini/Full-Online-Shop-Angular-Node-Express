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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = require("../DAO/models/user_model");
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};
const jwtFromRequest = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Token ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};
passport_1.default.use(new passport_jwt_1.Strategy(Object.assign(Object.assign({}, options), { jwtFromRequest }), (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findById(jwtPayload.id).exec();
        if (user) {
            return done(null, Object.assign(Object.assign({}, user.toObject()), { is_Admin: user.is_admin }));
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
})));
exports.default = passport_1.default;
