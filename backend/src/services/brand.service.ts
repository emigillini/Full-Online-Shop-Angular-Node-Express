
import { BrandManager } from "../managers/brand.manager";
import {  IBrand, IProduct } from "../types/types";




const brandman= new BrandManager()

export class BrandService {
 
   
    async getBrands(): Promise<IBrand[]> {
        try {
            const brand = await brandman.getBrands();
            return brand


        } catch (error) {
            console.error("Error fetching brands :", error);
            throw new Error(`Error fetching brands: ${error.message}`);
        }
    }
 
    
    
}
