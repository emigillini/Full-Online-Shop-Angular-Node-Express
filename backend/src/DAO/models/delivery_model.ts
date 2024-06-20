import mongoose, {Schema} from 'mongoose';
import { IDelivery} from '../../types';

const DeliveryCollection = "delivery";

const DeliverySchema = new mongoose.Schema<IDelivery>({
    purchase: { type: Schema.Types.ObjectId, ref: 'Purchase', required: true },
    tracking_number: { type: Number, required: true, default: function () {
        const timestamp = Date.now().toString(15);
        return `TNUMBER-${timestamp}`;
      }, },
    delivery_address: { type: String, required: true },
    estimated_date: { type: Date, required: true , default: Date.now },
    delivery_date: { type: Date ,  required:true, default: Date.now },
    delivery_status: { type: String, required:true},
});

export const DeliveryModel = mongoose.model<IDelivery>(DeliveryCollection, DeliverySchema);



