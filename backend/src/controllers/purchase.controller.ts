//create_purchase, confirm_purchase, user_puchases//

import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { IUser } from "../types/types";




const purchaseserv= new PurchaseService()

export class PurchaseController {
 
   
    async confirm_purchase(req: Request, res:Response): Promise<void> {
        try{
            const user = req.user as IUser
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const paymentType = req.body.paymentType; 
             

            if ( !paymentType) {
                res.status(400).json({ message: "Payment type are required" });
                return;
            }
          
            
            const result = await purchaseserv.confirm_purchase(user._id, paymentType); 

            res.status(200).json({
                message: "Purchase and delivery created successfully",
                purchase: result.purchase,
                delivery: result.delivery
            });
           
         

        } catch (error) {
            console.error("Error in PurchaseController ", error);
            res.status(500).json({ message: error.message });
        }
    }
 
    async user_purchases(req: Request, res:Response): Promise<void> {
        try {
            const user = req.user as IUser
            if (!user) {
                res.status(400).json({ message: "User is not authenticated" });
                return;
            }
            const purchases = await purchaseserv.user_purchases(user._id);
            res.status(200).json(purchases);

        } catch (error) {
            console.error("Error fetching user Purchases :", error);
            res.status(500).json({ message: error.message });
        }
    }
    async get_purchases(req: Request, res:Response): Promise<void> {
        try {
            
            const purchases = await purchaseserv.get_purchases();
            res.status(200).json(purchases);

        } catch (error) {
            console.error("Error fetching Purchases :", error);
            res.status(500).json({ message: error.message });
        }
    }
    
}
