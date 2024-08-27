import { CartManager } from "../managers/cart.manager";
import { ICart } from "../types/types";
import { Types } from "mongoose";

const cartman = new CartManager();

export class CartService {
  async createCart(userId: Types.ObjectId): Promise<ICart> {
    try {
      const cart = await cartman.createCart(userId);
      return cart;
    } catch (error) {
      console.error("Error in CartService createCart:", error);
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async deleteCart(userId: Types.ObjectId): Promise<string> {
    try {
      await cartman.deleteCart(userId);
      return "Cart deleted successfully";
    } catch (error) {
      console.error("Error in CartService deleteCart:", error);
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }

  async addProduct(
    userId: Types.ObjectId,
    product_id: Types.ObjectId,
    quantity: number
  ): Promise<ICart> {
    try {
      const cart = await this.getOrCreateCart(userId);
      await cartman.addProduct(cart, product_id, quantity);
      const updatedCart = await this.getCartByUser(userId);
      return updatedCart;
    } catch (error) {
      console.error("Error in CartService addProduct:", error);
      throw new Error(`Error adding product: ${error.message}`);
    }
  }
  async removeProduct(
    userId: Types.ObjectId,
    product_id: Types.ObjectId,
    quantity: number
  ): Promise<ICart> {
    try {
      const cart = await this.getOrCreateCart(userId);
      await cartman.removeProduct(cart, product_id, quantity);
      const updatedCart = await this.getCartByUser(userId);
      return updatedCart;
    } catch (error) {
      console.error("Error in CartService removeProduct:", error);
      throw new Error(`Error removing product: ${error.message}`);
    }
  }
  async getCartByUser(userId: Types.ObjectId): Promise<ICart | null> {
    try {
      const cart = await cartman.getCartByUser(userId);
      return cart;
    } catch (error) {
      console.error("Error fetching cart :", error);
      throw new Error(`Error fetching cart: ${error.message}`);
    }
  }
  async getOrCreateCart(userId: Types.ObjectId): Promise<ICart> {
    try {
      let cart = await this.getCartByUser(userId);
      if (!cart) {
        cart = await this.createCart(userId);
      }
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error(`Error fetching cart: ${error.message}`);
    }
  }
}
