import mongoose, { Schema } from "mongoose";
import { IBrand } from "../../types/types";

const BrandsCollection = "brands";

const BrandsSchema: Schema = new mongoose.Schema<IBrand>({
  description: { type: String, required: true },
});

BrandsSchema.set("toObject", { virtuals: true });
BrandsSchema.set("toJSON", { virtuals: true });

export const BrandModel = mongoose.model<IBrand>(
  BrandsCollection,
  BrandsSchema
);
