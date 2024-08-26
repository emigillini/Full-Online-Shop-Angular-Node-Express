"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalPrice = exports.addDays = void 0;
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
function calculateTotalPrice(cart) {
    return cart.products.reduce((sum, item) => {
        const price = item.product.price || 0;
        return sum + item.quantity * price;
    }, 0);
}
exports.calculateTotalPrice = calculateTotalPrice;
