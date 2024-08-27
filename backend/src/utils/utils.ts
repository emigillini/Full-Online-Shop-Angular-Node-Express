import { ICart } from "../types/types";

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function calculateTotalPrice(cart: ICart): number {
  return cart.products.reduce((sum: number, item: any) => {
    const price = item.product.price || 0;
    return sum + item.quantity * price;
  }, 0);
}
