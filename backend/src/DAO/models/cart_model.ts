import mongoose,  { Schema } from 'mongoose';
import { ICart} from '../../types';

const CartsCollection = "carts";

const CartsSchema:Schema = new mongoose.Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    date: { type: Date, required: true, default: Date.now },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, required: true }
    }]
});

CartsSchema.set('toObject', { virtuals: true });
CartsSchema.set('toJSON', { virtuals: true });

export const CartModel = mongoose.model<ICart>(CartsCollection, CartsSchema);


