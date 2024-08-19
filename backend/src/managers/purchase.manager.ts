import { PurchaseModel } from "../DAO/models/purchase_model";
import { IPurchase,IDelivery } from "../types/types";
import { Types } from "mongoose";
import { CartModel } from "../DAO/models/cart_model";
import { ProductModel } from "../DAO/models/product_model";
import { StripeService } from "../services/stripe.service";
import { DeliveryService } from "../services/delivery.service";
import { calculateTotalPrice } from "../utils/utils";
import { CartService } from "../services/cart.service";

    
const cartservice = new CartService()

export class PurchaseManager {
    async create_purchase(userId:Types.ObjectId,  paymentType:string): Promise<{ purchase: IPurchase; delivery: IDelivery }> {
        try {
            const cart = await CartModel.findOne({ user: userId }).sort({ createdAt: -1 }).populate('products.product').exec();
            if (!cart) {
                throw new Error("Cart not found");
            }
            if(cart.products.length===0){
                throw new Error("No products in Cart");
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
            

            
            const totalPrice = calculateTotalPrice(cart);
            if (paymentType === 'Stripe') {
                const paymentMethodId= "pm_card_visa"
                const amountInCents = totalPrice * 100; 
                const paymentIntent = await StripeService.createPaymentIntent(amountInCents);
                const confirmedIntent = await StripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
                if (confirmedIntent.status !== 'succeeded') {
                    throw new Error('Payment failed: ' + confirmedIntent.status);
                }
               
            } else if (paymentType === 'Cash') {
              
            } else {
                throw new Error("Unsupported payment method");
            }

            const newPurchase = await PurchaseModel.create({
                user: userId,
                Payment_Type: paymentType,
                cart: cart._id,
                total: totalPrice
            });

            
        
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
            await cartservice.createCart(userId);
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