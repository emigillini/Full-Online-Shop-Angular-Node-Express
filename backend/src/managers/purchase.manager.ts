import { PurchaseModel } from "../DAO/models/purchase_model";
import { ICart, IPurchase,IDelivery } from "../types/types";
import { Types } from "mongoose";
import { CartModel } from "../DAO/models/cart_model";
import { ProductModel } from "../DAO/models/product_model";
import { StripeService } from "../services/stripe.service";
import { DeliveryService } from "../services/delivery.service";



export class PurchaseManager {
    async create_purchase(userId:Types.ObjectId,  paymentType:string): Promise<{ purchase: IPurchase; delivery: IDelivery }> {
        try {
            const cart = await CartModel.findOne({ user: userId }).populate('products.product').exec();
            if (!cart) {
                throw new Error("Cart not found");
            }

            for (const item of cart.products) { 
                const product = item.product as any ;
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ${product._id}`);
                }
                await ProductModel.updateOne(
                    { _id: product._id },
                    { $inc: { stock: -item.quantity } }
                );
            }
            

            
            const totalPrice = this.calculateTotalPrice(cart);
            if (paymentType === 'Stripe') {
                const paymentMethodId= "pm_card_visa"
                const amountInCents = totalPrice * 100; // Stripe expects the amount in cents
                const paymentIntent = await StripeService.createPaymentIntent(amountInCents);
                const confirmedIntent = await StripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
               
            } else if (paymentType === 'Cash') {
              
            } else {
                throw new Error("Unsupported payment method");
            }

            const newPurchase = new PurchaseModel({
                user: userId,
                Payment_Type: paymentType,
                cart: cart._id,
                total: totalPrice
            });

            
            await newPurchase.save();
            const delivery = await DeliveryService.create_delivery(userId, newPurchase._id)
            
            const populatedPurchase = await PurchaseModel.findById(newPurchase._id)
            .populate('user') 
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                    model: 'products'
                }
            }) 
            .exec();
            await CartModel.findOneAndDelete({ user: userId });
            return { purchase: populatedPurchase, delivery: delivery };;

        } catch (error) {
            console.error("Error creating purchase:", error);
            throw new Error("Failed create Purchase");
        }
    }
    async user_purchases(userId:Types.ObjectId): Promise<IPurchase[]> {
        try {
           const purchases = await PurchaseModel.find({ user: userId })
           .populate('user') 
           .populate({
               path: 'cart',
               populate: {
                   path: 'products.product',
                   model: 'products'
               }
           }) 
           .exec();

        return purchases;

        } catch (error) {
            console.error("Error fetching user purchases:", error);
            throw new Error("Failed to fetch user purchases");
        }
    }
    private calculateTotalPrice(cart: ICart): number {
        return cart.products.reduce((sum: number, item:any) => {
           
            const price = item.product.price || 0;
            return sum + item.quantity * price;
        }, 0);
    }

    async get_purchases(): Promise<IPurchase[]> {
        try {
           const purchases = await PurchaseModel.find()
           .populate('user') 
           .populate({
               path: 'cart',
               populate: {
                   path: 'products.product',
                   model: 'products'
               }
           }) 
           .exec();

        return purchases;

        } catch (error) {
            console.error("Error fetching purchases:", error);
            throw new Error("fetching purchases");
        }
    }

    
 
    
}