import mongoose, { Schema } from 'mongoose';
import { IProduct} from '../../types';

const ProductsCollection = "products";

const ProductSchema: Schema = new Schema<IProduct>({
    model: { 
        type: Number, 
        required: true,
        enum: [2024, 2023, 2022, 2000],
    },
    brand: { 
        type: String, 
        required: true,
        enum: ["nike", "adidas", "puma", "reebok"],
    },
    color: { 
        type: String, 
        required: true,
        enum: ["red", "blue", "white", "black"], 
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

