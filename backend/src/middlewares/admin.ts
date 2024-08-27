import { Request, Response, NextFunction } from "express";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as { is_Admin: boolean };

  if (user && user.is_Admin) {
    next();
  } else {
    res.status(403).json({ message: " Admins only" });
  }
};
