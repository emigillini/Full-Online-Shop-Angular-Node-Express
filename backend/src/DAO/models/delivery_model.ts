import mongoose, { Schema } from "mongoose";
import { IDelivery } from "../../types/types";
import { addDays } from "../../utils/utils";

const DeliveryCollection = "delivery";

const DeliverySchema: Schema = new mongoose.Schema<IDelivery>({
  purchase: { type: Schema.Types.ObjectId, ref: "purchases", required: true },
  tracking_number: {
    type: String,
    required: true,
    default: function () {
      const timestamp = Date.now().toString(15);
      return `TNUMBER-${timestamp}`;
    },
  },
  delivery_address: { type: String, required: true },
  estimated_date: {
    type: Date,
    required: true,
    default: function () {
      return addDays(new Date(), 3);
    },
  },
  delivery_date: { type: Date, required: true, default: Date.now },
  delivery_status: { type: String, required: true },
});

DeliverySchema.set("toObject", { virtuals: true });
DeliverySchema.set("toJSON", { virtuals: true });

export const DeliveryModel = mongoose.model<IDelivery>(
  DeliveryCollection,
  DeliverySchema
);
