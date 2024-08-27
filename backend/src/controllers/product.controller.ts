import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const prodserv = new ProductService();

export class ProductController {
  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = req.body;
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
      const product = await prodserv.getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error in ProductController getProductByIds:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async get_random_product_excluding_id(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const current_product_id = req.query.current_product_id as string;
      const product = await prodserv.get_random_product_excluding_id(
        current_product_id
      );
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(
        "Error in ProductController get_random_product_excluding_id:",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }

  async modifiedProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const product = await prodserv.modifiedProduct(id, updateData);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getProductsByBrandName(req: Request, res: Response): Promise<void> {
    try {
      const brandName = req.params.brandName;
      const products = await prodserv.getProductsByBrandName(brandName);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by brand name:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
