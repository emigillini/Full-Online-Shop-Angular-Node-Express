import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { IUser } from "../types/types";

const cartserv = new CartService();

export class CartController {
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      if (!user) {
        res.status(400).json({ message: "User is not authenticated" });
        return;
      }
      await cartserv.deleteCart(user.id);
      res.status(200).json("Cart deleted successfully");
    } catch (error) {
      console.error("Error in CartController delete:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const { product_id, quantity = 1 } = req.body;

      const updatedCart = await cartserv.addProduct(
        user._id,
        product_id,
        quantity
      );
      res.status(200).json({ message: "Product Added", cart: updatedCart });
    } catch (error) {
      console.error("Error in CartController addProduct:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async removeProduct(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const { product_id, quantity = 1 } = req.body;

      const updatedCart = await cartserv.removeProduct(
        user._id,
        product_id,
        quantity
      );
      res.status(200).json({ message: "Product Removed", cart: updatedCart });
    } catch (error) {
      console.error("Error in CartController removeProduct:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getOrCreateCart(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const cart = await cartserv.getOrCreateCart(user._id);
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;
      const cart = await cartserv.getCartByUser(user._id);
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
