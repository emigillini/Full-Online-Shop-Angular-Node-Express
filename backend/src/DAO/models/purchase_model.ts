import mongoose,  { Schema } from 'mongoose';
import { IPurchase} from '../../types/types';

const PurchaseCollection = "purchases";

const PurchaseSchema:Schema = new mongoose.Schema<IPurchase>({
    invoice_number: { type: String, required: true, default: function () {
        const timestamp = Date.now().toString(36);
        return `TICKET-${timestamp}`;
      }, },
    date: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    total: { type: Number, required: true, default:0 },
    Payment_Type: { type: String, required: true, enum: ["Debit_Card", "Paypal", "Credit_Card"] },
    cart: { type: Schema.Types.ObjectId, ref: 'carts', required: true },

})
PurchaseSchema.virtual('delivery', {
  ref: 'DeliveryModel',
  localField: '_id',
  foreignField: 'purchase'
});

PurchaseSchema.set('toObject', { virtuals: true });
PurchaseSchema.set('toJSON', { virtuals: true });

export const PurchaseModel = mongoose.model<IPurchase>(PurchaseCollection, PurchaseSchema);
















