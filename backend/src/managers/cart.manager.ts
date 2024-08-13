import { ICart, ICartProduct, IProduct, IUser } from "../types/types";
import { CartModel } from "../DAO/models/cart_model"; 
import { ProductModel } from "../DAO/models/product_model";
import { Types } from "mongoose";

export class CartManager {

    async createCart(user: IUser): Promise<ICart> {
        try {
            const newCart = new CartModel({ user: user._id, date: new Date(), products: [] });
            await newCart.save();
            return newCart.populate('user');
        } catch (error) {
            console.error("Error in CartManager createCart:", error);
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async deleteCart(user: IUser): Promise<string> {
        try {
            const cart = await CartModel.findOneAndDelete({ user: user._id });
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
            const productIndex = cart.products.findIndex(p => p.product.toString() === product.toString());

            if (productIndex > -1) {

                cart.products[productIndex].quantity += quantity;
            } else {
                const newCartProduct = { product: product_id, quantity } as ICartProduct;
                cart.products.push(newCartProduct);
            }

    
            await cart.save();
            return cart.populate('products.product')
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
                return cart.populate('products.product')
            } else {
                throw new Error("Product not found in cart");
            }
        } catch (error) {
            console.error("Error in CartManager removeProduct:", error);
            throw new Error(`Error removing product from cart: ${error.message}`);
        }
    }

    async getCartByUser(user: IUser): Promise<ICart | null> {
        try {
           
            return await CartModel.findOne({ user: user._id }).populate('products.product').populate('user'); 
        } catch (error) {
            console.error("Error in CartManager getCartByUser:", error);
            throw new Error(`Error fetching cart by user: ${error.message}`);
        }
    }
}
