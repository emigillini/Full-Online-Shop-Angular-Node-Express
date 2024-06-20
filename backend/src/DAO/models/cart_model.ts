import mongoose,  { Schema } from 'mongoose';
import { ICart} from '../../types';

const CartsCollection = "carts";

const CartsSchema = new mongoose.Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now },
    products: { type: [{ type: Schema.Types.ObjectId, ref: 'Product' }], default: [] }
});

export const CartModel = mongoose.model<ICart>(CartsCollection, CartsSchema);


