import { PaymentModel } from "../DAO/models/payment_model";
import { IPaymentType } from "../types/types";

export class PaymentManager {
  async getPayments(): Promise<IPaymentType[]> {
    try {
      const payments = await PaymentModel.find();
      return payments;
    } catch (error) {
      console.error("Error in PaymentManager getPayments:", error);
      throw new Error(`Error fetching brands : ${error.message}`);
    }
  }
}
