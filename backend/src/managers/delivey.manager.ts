import { DeliveryModel } from "../DAO/models/delivery_model";
import { Types } from "mongoose";
import { IDelivery } from "../types/types";
import { UserModel } from "../DAO/models/user_model";

export class DeliveryManager {
  async create_delivery(
    userId: Types.ObjectId,
    purchaseid: Types.ObjectId
  ): Promise<IDelivery> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const newDelivery = await DeliveryModel.create({
        purchase: purchaseid,
        delivery_address: user.adress || user.email,
        delivery_status: "Pending",
      });

      const populatedDelivery = await DeliveryModel.findById(newDelivery._id)
        .populate("purchase")
        .exec();
      return populatedDelivery;
    } catch (error) {
      console.error("Error in DeliveryManager create_delivery:", error);
      throw new Error(`Error creating delivery: ${error.message}`);
    }
  }
  async getDeliveries(): Promise<IDelivery[]> {
    try {
      const deliveries = await DeliveryModel.find();
      if (!deliveries) {
        throw new Error("Deliveries not found");
      }

      return deliveries;
    } catch (error) {
      console.error("Error in DeliveryManager getDeliveries:", error);
      throw new Error(`Error fetching Deliveries: ${error.message}`);
    }
  }
  async changeStatus(
    delivery_id: Types.ObjectId,
    delivery_status: Partial<IDelivery>
  ): Promise<IDelivery> {
    try {
      const newDelivery = await DeliveryModel.findByIdAndUpdate(
        delivery_id,
        { delivery_status: delivery_status },
        {
          new: true,
          runValidators: true,
        }
      );
      return newDelivery;
    } catch (error) {
      console.error("Error in DeliveryManager getDeliveries:", error);
      throw new Error(`Error fetching Deliveries: ${error.message}`);
    }
  }
}
