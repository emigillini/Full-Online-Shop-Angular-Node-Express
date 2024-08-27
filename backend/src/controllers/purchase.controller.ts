import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { IUser } from "../types/types";

const purchaseServ = new PurchaseService();

export class PurchaseController {
  async confirm_purchase(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;

      if (!user) {
        res.status(401).json({ message: "User is not authenticated" });
        return;
      }

      const { paymentType } = req.body;

      const result = await purchaseServ.confirm_purchase(user._id, paymentType);

      res.status(200).json({
        message: "Purchase and delivery created successfully",
        purchase: result.purchase,
        delivery: result.delivery,
      });
    } catch (error) {
      console.error("Error in PurchaseController: confirm_purchase", error);
      res
        .status(500)
        .json({
          message: "An error occurred while confirming the purchase",
          error: error.message,
        });
    }
  }

  async user_purchases(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as IUser;

      if (!user) {
        res.status(401).json({ message: "User is not authenticated" });
        return;
      }

      const purchases = await purchaseServ.user_purchases(user._id);
      res.status(200).json(purchases);
    } catch (error) {
      console.error("Error in PurchaseController: user_purchases", error);
      res
        .status(500)
        .json({
          message: "An error occurred while fetching user purchases",
          error: error.message,
        });
    }
  }

  async get_purchases(req: Request, res: Response): Promise<void> {
    try {
      const purchases = await purchaseServ.get_purchases();
      res.status(200).json(purchases);
    } catch (error) {
      console.error("Error in PurchaseController: get_purchases", error);
      res
        .status(500)
        .json({
          message: "An error occurred while fetching all purchases",
          error: error.message,
        });
    }
  }
}
