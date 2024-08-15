import { ProductManager } from "../managers/product.manager";
import { IProduct } from "../types/types";

const prodman= new ProductManager()

export class ProductService {

    async createProduct(productData: IProduct): Promise<IProduct> {
        try {
            const product = await prodman.addProduct(productData);
            return product
        } catch (error) {
            console.error("Error in ProductService createProduct:", error);
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async getProducts(filters: any = {}): Promise<IProduct[]> {
        try {   
            const products = await prodman.getProducts(filters);
            return products
        } catch (error) {
            console.error("Error in ProductService getProducts:", error);
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async getProductById(id: string): Promise<IProduct | null> {
        try {
            const product = await prodman.getProductById(id);
            return product
        } catch (error) {
            console.error("Error in ProductService getProductById:", error);
            throw new Error(`Error fetching product by ID: ${error.message}`);
        }
    }
    async get_random_product_excluding_id(current_product_id:string): Promise<IProduct | null> {
        try {
            const product = await prodman.get_random_product_excluding_id(current_product_id);
            return product
        } catch (error) {
            console.error("Error in ProductService getRandomProductExcludingId:", error);
            throw new Error(`Error fetching random product : ${error.message}`);
        }
    }
    async modifiedProduct(id: string, updateData: Partial<IProduct> ): Promise<IProduct | null> {
        try {
            const product = await prodman.modifiedProduct(id, updateData);
            return product
        } catch (error) {
            console.error("Error in ProductService updating product:", error);
            throw new Error(`Error updating product: ${error.message}`);
        }
    }
}
