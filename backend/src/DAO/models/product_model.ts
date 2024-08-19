import mongoose, { Schema } from 'mongoose';
import { IProduct} from '../../types/types';

const ProductsCollection = "products";

const ProductSchema: Schema = new Schema<IProduct>({
    model: { 
        type: String, 
        required: true,
        enum: ["Model A", "Model B", "Model C", "Model D","Model E"],
    },
    brand: { 
        type: Schema.Types.ObjectId, 
        ref: 'brands', 
        required: true,
    },
    color: { 
        type: String, 
        required: true,
        enum: ["Red", "Blue", "White", "Black"], 
    },
    size: { 
        type: Number, 
        required: true,
        enum: [5, 6, 7, 8],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, default: null },
    detail: { type: String, default: '' },
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

export const ProductModel = mongoose.model<IProduct>(ProductsCollection, ProductSchema);

