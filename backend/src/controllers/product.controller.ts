import { Request, Response } from "express";
import { ProductService } from "../services/product.service";


const prodserv= new ProductService()

export class ProductController {
 
    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = req.body;   
            if (!product.model || !product.brand || !product.color || !product.size || product.price === undefined || product.stock === undefined) {
                res.status(400).json({ message: 'Model, brand, color, size, price, and stock are required' });
                return;
              }
              if (typeof product.price !== 'number' || product.price <= 0) {
                res.status(400).json({ message: 'Price must be a positive number' });
                return;
              }
              if (typeof product.stock !== 'number' || product.stock < 0) {
                res.status(400).json({ message: 'Stock must be a non-negative number' });
                return;
              }
              if (typeof product.image !== 'string' || typeof product.detail !== 'string') {
                res.status(400).json({ message: 'Image and detail must be strings' });
                return;
              }
               await prodserv.createProduct(product);
            res.status(201).json(product);
        } catch (error) {
            console.error("Error in ProductController addProduct:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const filters = req.filter || {}; 
            const products = await prodserv.getProducts(filters);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error in ProductController getAllProducts:", error);
            res.status(500).json({ message: error.message });                  
        }
    }

    async getProductByIds(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ message: 'Product ID is required' });
                return;
            }
            const product = await prodserv.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.error("Error in ProductController getProductByIds:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async get_random_product_excluding_id(req: Request, res:Response): Promise<void> {
        try{
            const current_product_id= req.query.current_product_id as string
            console.log(current_product_id)
            const product = await prodserv.get_random_product_excluding_id(current_product_id)
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }


        } catch (error) {
            console.error("Error in ProductController get_random_product_excluding_id:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async modifiedProduct(req: Request, res:Response): Promise<void> {
        try {
            const id = req.params.id
            const updateData = req.body
             if (!id || !updateData) {
            res.status(400).json({ message: 'Invalid input' });
            return;
        }
        if (updateData.price !== undefined && (typeof updateData.price !== 'number' || updateData.price <= 0)) {
            res.status(400).json({ message: 'Price must be a positive number' });
            return;
          }
          if (updateData.stock !== undefined && (typeof updateData.stock !== 'number' || updateData.stock < 0)) {
            res.status(400).json({ message: 'Stock must be a non-negative number' });
            return;
          }
          if (updateData.image !== undefined && typeof updateData.image !== 'string') {
            res.status(400).json({ message: 'Image must be a string' });
            return;
          }
          if (updateData.detail !== undefined && typeof updateData.detail !== 'string') {
            res.status(400).json({ message: 'Detail must be a string' });
            return;
          }
            const product= await prodserv.modifiedProduct(id, updateData)
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }

        } catch (error) {
            console.error("Error updating product :", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getProductsByBrandName(req: Request, res: Response): Promise<void> {
        try {
            const brandName = req.params.brandName;
            if (!brandName) {
                res.status(400).json({ message: 'Brand name is required' });
                return;
            }
            const products = await prodserv.getProductsByBrandName(brandName);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products by brand name:", error);
            res.status(500).json({ message: error.message });
        }
    }
}
