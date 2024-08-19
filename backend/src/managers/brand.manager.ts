
import { BrandModel } from "../DAO/models/brand_model";
import { ProductModel } from "../DAO/models/product_model";
import { IBrand, IProduct } from "../types/types";

export class BrandManager {


    async getBrands(): Promise<IBrand[] > {
        try {
            const brands = await BrandModel.find();
            return brands;
          
           
        } catch (error) {
            console.error("Error in BrandManager getByBrand:", error);
            throw new Error(`Error fetching cart by user: ${error.message}`);
        }
    }
 
  
}
