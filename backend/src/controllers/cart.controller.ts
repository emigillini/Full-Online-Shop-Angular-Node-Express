import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { IUser } from "../types/types";


const cartserv= new CartService()

export class CartController {
 
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const user= req.user as IUser 
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            await cartserv.deleteCart(user.id); 
            res.status(200).json("cart deleted successfully");

        } catch (error) {
            console.error("Error in CartController delete:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            
            const user = req.user as IUser
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const product_id = req.body.product_id;
            const quantity = parseInt(req.body.quantity, 10) || 1;
            if (!product_id) {
                res.status(400).json({ message: "Product ID is required" });
                return;
            }
            if (quantity <= 0) {
                res.status(400).json({ message: "Quantity must be greater than zero" });
                return;
            }

            const updatedCart = await cartserv.addProduct(user._id, product_id, quantity); 

            res.status(200).json({"messsage":"Product Added", cart: updatedCart });
           
        } catch (error) {
            console.error("Error in CartController: ", error);
            res.status(500).json({ message: error.message });
        }
    }
    async removeProduct(req: Request, res:Response): Promise<void> {
        try{
            const user = req.user as IUser
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const product_id = req.body.product_id
            const quantity = parseInt(req.body.quantity, 10) || 1;
            if (!product_id) {
                res.status(400).json({ message: "Product ID is required" });
                return;
            }
            if (quantity <= 0) {
                res.status(400).json({ message: "Quantity must be greater than zero" });
                return;
            }
            const updatedCart = await cartserv.removeProduct(user._id, product_id, quantity); 
            res.status(200).json({"messsage":"Product Removed", cart: updatedCart});
         

        } catch (error) {
            console.error("Error in CartController ", error);
            res.status(500).json({ message: error.message });
        }
    }
 
    async getOrCreateCart(req: Request, res:Response): Promise<void> {
        try {
            const user = req.user as IUser
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const cart = await cartserv.getOrCreateCart(user._id);
            res.status(200).json(cart);

        } catch (error) {
            console.error("Error fetching cart :", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getCart(req: Request, res:Response): Promise<void> {
        try {
            const user = req.user as IUser
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const cart = await cartserv.getCartByUser(user._id);
            res.status(200).json(cart);

        } catch (error) {
            console.error("Error fetching cart :", error);
            res.status(500).json({ message: error.message });
        }
    }
    
    
}
