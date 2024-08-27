import mongoose, { Schema } from "mongoose";
import { IPurchase } from "../../types/types";

const PurchaseCollection = "purchases";

const PurchaseSchema: Schema = new mongoose.Schema<IPurchase>({
  invoice_number: {
    type: String,
    required: true,
    default: function () {
      const timestamp = Date.now().toString(36);
      return `TICKET-${timestamp}`;
    },
  },
  date: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  total: { type: Number, required: true, default: 0 },
  paymentType: {
    type: Schema.Types.ObjectId,
    ref: "paymentType",
    required: true,
  },
  cart: { type: Schema.Types.ObjectId, ref: "carts", required: true },
  delivery: { type: Schema.Types.ObjectId, ref: "delivery" },
});

PurchaseSchema.set("toObject", { virtuals: true });
PurchaseSchema.set("toJSON", { virtuals: true });

export const PurchaseModel = mongoose.model<IPurchase>(
  PurchaseCollection,
  PurchaseSchema
);
