import { Request, Response } from "express";
import { DeliveryService } from "../services/delivery.service";
import { Delivery } from "../types/types";

export class DeliveryController {
    async getDeliveries(req: Request, res: Response): Promise<void> {
        try {
            
            const deliveries= await DeliveryService.getDeliveries(); 
            res.status(200).json(deliveries);

        } catch (error) {
            console.error("Error in DeliveryController getDeliveries:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async changeStatus(req: Request, res: Response): Promise<void> {
        try {
            const delivery_id = req.body.delivery_id
            const delivery_status = req.body.delivery_status
            
            
            if (!delivery_id||!delivery_status){
                res.status(400).json({ message: 'delivery_id, delivery_status are required' });
                return;
              }

              const validStatuses: Delivery[] = ["Pending", "Transit", "Complete"];

              if (!validStatuses.includes(delivery_status as Delivery)) {
                  res.status(400).json({ message: `Invalid delivery status: ${delivery_status}, valid status : "Pending", "Transit", "Complete" ` });
                  return;
              }
            
            const newStatus= await DeliveryService.changeStatus(delivery_id, delivery_status); 
            res.status(200).json(newStatus);

        } catch (error) {
            console.error("Error in DeliveryController changeStatus:", error);
            res.status(500).json({ message: error.message });
        }
    }
    

    
}
