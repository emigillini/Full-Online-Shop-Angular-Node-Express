import { BrandModel } from "../DAO/models/brand_model";
import { ProductModel } from "../DAO/models/product_model";
import { IProduct } from "../types/types";
import { Types } from "mongoose";

export class ProductManager {
    async addProduct(productData: IProduct): Promise<IProduct> {
        try {
            const product = await ProductModel.create(productData);
            return product;
        } catch (error) {
            console.error("Error adding product:", error);
            throw new Error("Failed to add product");
        }
    }

    async getProducts(filters: any = {}): Promise<IProduct[] | null> {
        try {
            const products = await ProductModel.find(filters).populate('brand').exec();
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products");
        }
    }

    async getProductById(id: string): Promise<IProduct | null> {
        try {
            const product = await ProductModel.findById(id).populate('brand').exec();
            return product;
        } catch (error) {
            console.error("Error fetchingg product by ID:", error);
            throw new Error("Failed to fetch product by ID");
        }
    }
    async get_random_product_excluding_id(current_product_id: string): Promise<IProduct | null> {
        try {
           
            const productId = new Types.ObjectId(current_product_id);
            const products = await ProductModel.find({ _id: { $ne: productId } }).exec();
            if (products.length === 0) {
                return null; 
            }
    
            const randomIndex = Math.floor(Math.random() * products.length);
           
            return products[randomIndex];
    
        } catch (error) {
            console.error("Error fetching random product:", error);
            throw new Error("Failed to fetch random product");
        }
    }
    async modifiedProduct(id: string, updateData:Partial<IProduct>): Promise<IProduct | null> {
        try {
            
            const newProduct:IProduct = await ProductModel.findByIdAndUpdate(id, updateData,{
                new:true, 
                runValidators:true}).populate('brand').exec()
            return newProduct;
        } catch (error) {
            console.error("Error updating product :", error);
            throw new Error("Failed updating product");
        }
    }
    async getProductsByBrandName(brandName: string): Promise<IProduct[]> {
        try {
            console.log(`Searching for brand: ${brandName}`);
            const brand = await BrandModel.findOne({ description: brandName }).exec();
            console.log(brand)
            if (!brand) {
                
                throw new Error("Brand not found");
            }

            console.log(`Searching for products with brand ID: ${brand._id}`);
            const products = await ProductModel.find({ brand: brand._id }).populate('brand').exec();
            return products;
        } catch (error) {
            console.error("Error in ProductManager getProductsByBrandName:", error);
            throw new Error(`Error fetching products by brand name: ${error.message}`);
        }
    }

    
    
}