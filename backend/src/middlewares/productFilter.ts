import { Request, Response, NextFunction } from "express";

export function filterMiddleware(req: Request, res: Response, next: NextFunction): void {
    const filters: any = {};
    const { brand, has_stock, min_price, max_price } = req.query;

    if (brand) filters.brand = brand;
    if (has_stock !== undefined) {
        filters.stock = has_stock === 'true' ? { $gt: 0 } : { $eq: 0 };
    }
    if (min_price) filters.price = { ...filters.price, $gte: parseFloat(min_price as string) };
    if (max_price) filters.price = { ...filters.price, $lte: parseFloat(max_price as string) };

    req.filter = filters; 
    next();
}
