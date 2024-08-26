"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMiddleware = void 0;
const filterMiddleware = (req, res, next) => {
    const filters = {};
    const { brand, has_stock, min_price, max_price } = req.query;
    if (brand)
        filters.brand = brand;
    if (has_stock !== undefined) {
        filters.stock = has_stock === 'true' ? { $gt: 0 } : { $eq: 0 };
    }
    if (min_price)
        filters.price = Object.assign(Object.assign({}, filters.price), { $gte: parseFloat(min_price) });
    if (max_price)
        filters.price = Object.assign(Object.assign({}, filters.price), { $lte: parseFloat(max_price) });
    req.filter = filters;
    next();
};
exports.filterMiddleware = filterMiddleware;
