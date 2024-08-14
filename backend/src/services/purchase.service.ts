

import { Types } from "mongoose";
import { IPurchase } from "../types/types";
import { PurchaseManager } from "../managers/purchase.manager";



const purchaseman = new PurchaseManager()

export class PurchaseService {
 
    async confirm_purchase(userid:Types.ObjectId, paymentType:string): Promise<IPurchase> {
        try {
          const purchase= await purchaseman.create_purchase(userid, paymentType)
          return purchase
          
        } catch (error) {
            console.error("Error in PurchaseService confirmPurchase:", error);
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }
    async user_purchases(userid:Types.ObjectId): Promise<IPurchase[]> {
        try {
          const purchases= await purchaseman.user_purchases(userid)
          return purchases
          
        } catch (error) {
            console.error("Error in PurchaseService user_purchases", error);
            throw new Error(`Error fecthing user_purchases: ${error.message}`);
        }
    }
    async get_purchases(): Promise<IPurchase[]> {
        try {
          const purchases= await purchaseman.get_purchases()
          return purchases
          
        } catch (error) {
            console.error("Error in PurchaseService user_purchases", error);
            throw new Error(`Error fecthing user_purchases: ${error.message}`);
        }
    }

}
