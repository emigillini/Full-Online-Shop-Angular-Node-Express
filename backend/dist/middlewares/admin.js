"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    const user = req.user;
    if (user && user.is_Admin) {
        next();
    }
    else {
        res.status(403).json({ message: ' Admins only' });
    }
};
exports.adminOnly = adminOnly;
