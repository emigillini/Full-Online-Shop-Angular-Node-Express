import mongoose,  { Schema } from 'mongoose';
import {IPaymentType} from '../../types/types';

const PaymentCollection = "payment";

const PaymentSchema:Schema = new mongoose.Schema<IPaymentType>({
    description: { type: String , required: true },
  
})

PaymentSchema.set('toObject', { virtuals: true });
PaymentSchema.set('toJSON', { virtuals: true });

export const PaymentModel = mongoose.model<IPaymentType>(PaymentCollection, PaymentSchema);


