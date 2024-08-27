import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const paymentserv = new PaymentService();

export class PaymentController {
  async getPayments(req: Request, res: Response): Promise<void> {
    try {
      const payments = await paymentserv.getPayments();
      res.status(200).json(payments);
    } catch (error) {
      console.error("Error fetching payments :", error);
      res.status(500).json({ message: error.message });
    }
  }
}
