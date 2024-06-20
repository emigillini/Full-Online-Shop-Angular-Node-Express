
import mongoose from 'mongoose';
import { IProduct} from '../../types';

const ProductsCollection = "products";

const ProductSchema = new mongoose.Schema<IProduct>({
    model: { type: Number, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, default: null },
    detail: { type: String, default: ''},
});

export const ProductModel = mongoose.model<IProduct>(ProductsCollection, ProductSchema);







