
import { CartManager } from "../managers/cart.manager";
import { ICart, IProduct, IUser } from "../types/types";
import { Types } from "mongoose";


const cartman= new CartManager()

export class CartService {
 
    async createCart(user:IUser): Promise<ICart> {
        try {
          const cart= await cartman.createCart(user)
          return cart
        } catch (error) {
            console.error("Error in CartService createCart:", error);
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async deleteCart(user:IUser): Promise<string> {
        try {
            await cartman.deleteCart(user); 
            return "Cart deleted successfully";

        } catch (error) {
            console.error("Error in CartService deleteCart:", error);
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }

    async addProduct(cart:ICart, product_id: Types.ObjectId, quantity:number): Promise<ICart> {
        try {
            await cartman.addProduct(cart,product_id, quantity); 
            return cart
           
        } catch (error) {
            console.error("Error in CartService addProduct:", error);
            throw new Error(`Error adding product: ${error.message}`);
        }
    }
    async removeProduct(cart:ICart, product_id: Types.ObjectId, quantity:number): Promise<string> {
        try{
            await cartman.removeProduct(cart,product_id, quantity); 
            return "Product deleted succesfully"

        } catch (error) {
            console.error("Error in CartService removeProduct:", error);
            throw new Error(`Error removing product: ${error.message}`);
        }
    } 
    async getCartByUser(user:IUser): Promise<ICart | null> {
        try {
            const cart = await cartman.getCartByUser(user);
            return cart


        } catch (error) {
            console.error("Error fetching cart :", error);
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }
    async getOrCreateCart(user:IUser): Promise<ICart> {
        try {
            let cart = await this.getCartByUser(user);
            if (!cart) {
                cart = await this.createCart(user);
            }
            return cart

        } catch (error) {
            console.error("Error fetching cart:", error);
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }
    
}
