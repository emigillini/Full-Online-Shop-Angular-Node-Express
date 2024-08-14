import { ICart, ICartProduct, IProduct, IUser } from "../types/types";
import { CartModel } from "../DAO/models/cart_model"; 
import { ProductModel } from "../DAO/models/product_model";
import { Types } from "mongoose";

export class CartManager {

    async createCart(userId: Types.ObjectId): Promise<ICart> {
        try {
        
            const newCart = await CartModel.create({
                user: userId,
                date: new Date(),
                products: []
            });
            return newCart;
        } catch (error) {
            console.error("Error in CartManager createCart:", error);
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async deleteCart(userId:Types.ObjectId): Promise<string> {
        try {
            const cart = await CartModel.findOneAndDelete({ user: userId });
            if (!cart) {
                throw new Error("Cart not found");
            }
            return "cart deleted"
        } catch (error) {
            console.error("Error in CartManager deleteCart:", error);
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }

    async addProduct(cart: ICart, product_id: Types.ObjectId, quantity: number): Promise<ICart> {
        try {
            const product =await ProductModel.findById(product_id);
            if (!product) {
                throw new Error("Product not found");
            }

            if (product.stock < quantity) {
                throw new Error("Insufficient stock");
            }
            const productIndex = cart.products.findIndex(p => p.product.toString() === product.toString());

            if (productIndex > -1) {

                cart.products[productIndex].quantity += quantity;
            } else {
                const newCartProduct = { product: product_id, quantity } as ICartProduct;
                cart.products.push(newCartProduct);
            }

    
            await cart.save();
            return cart
        } catch (error) {
            console.error("Error in CartManager addProduct:", error);
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    async removeProduct(cart: ICart, product_id: Types.ObjectId, quantity: number): Promise<ICart> {
        try {
            const product =await ProductModel.findById(product_id)
            if (!product) {
                throw new Error("Product not found");
            }
          
            const productIndex = cart.products.findIndex(p => p.product.toString() === product.toString());

            if (productIndex > -1) {
              
                if (cart.products[productIndex].quantity <= quantity) {
                    cart.products.splice(productIndex, 1);
                } else {
                    cart.products[productIndex].quantity -= quantity;
                }

                await cart.save();
                return cart
            } else {
                throw new Error("Product not found in cart");
            }
        } catch (error) {
            console.error("Error in CartManager removeProduct:", error);
            throw new Error(`Error removing product from cart: ${error.message}`);
        }
    }

    async getCartByUser(userId: Types.ObjectId): Promise<ICart | null> {
        try {
           const cart = await CartModel.findOne({ user: userId }) 
           .populate('products.product')
           .populate("user")
                .exec();
            return cart
        } catch (error) {
            console.error("Error in CartManager getCartByUser:", error);
            throw new Error(`Error fetching cart by user: ${error.message}`);
        }
    }
  
}
