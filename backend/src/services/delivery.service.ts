
import { DeliveryManager } from "../managers/delivey.manager";
import { Types } from "mongoose";
import { IDelivery } from "../types/types";

const deliveryman= new DeliveryManager()

export class DeliveryService {
 
    static async create_delivery(userId:Types.ObjectId, purchaseid:Types.ObjectId): Promise<IDelivery> {
        try {
          const delivery= await deliveryman.create_delivery( userId, purchaseid)
          return delivery
        } catch (error) {
            console.error("Error in DeliveryService create_delivery:", error);
            throw new Error(`Error creating Delivery: ${error.message}`);
        }
    }
    static async getDeliveries(): Promise<IDelivery[]> {
        try {
          const deliveries= await deliveryman.getDeliveries()
          return deliveries
        } catch (error) {
            console.error("Error in DeliveryService create_delivery:", error);
            throw new Error(`Error creating Delivery: ${error.message}`);
        }
    }static async changeStatus(delivery_id:Types.ObjectId, delivery_status:Partial<IDelivery>): Promise<IDelivery> {
        try {
          const delivery= await deliveryman.changeStatus(delivery_id, delivery_status)
          return delivery
        } catch (error) {
            console.error("Error in DeliveryService create_delivery:", error);
            throw new Error(`Error creating Delivery: ${error.message}`);
        }
    }

   
} 
