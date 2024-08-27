import { Request, Response } from "express";
import { BrandService } from "../services/brand.service";

const brandserv = new BrandService();

export class BrandController {
  async getBrands(req: Request, res: Response): Promise<void> {
    try {
      const brands = await brandserv.getBrands();
      res.status(200).json(brands);
    } catch (error) {
      console.error("Error fetching Brands :", error);
      res.status(500).json({ message: error.message });
    }
  }
}
