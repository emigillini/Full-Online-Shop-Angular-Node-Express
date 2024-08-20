
import { PaymentManager } from "../managers/payment.manager";
import { IPaymentType } from "../types/types";




const paymentman= new PaymentManager()

export class PaymentService {
 
   
    async getPayments(): Promise<IPaymentType[]> {
        try {
            const brand = await paymentman.getPayments();
            return brand


        } catch (error) {
            console.error("Error fetching brands :", error);
            throw new Error(`Error fetching brands: ${error.message}`);
        }
    }
 
    
    
}
