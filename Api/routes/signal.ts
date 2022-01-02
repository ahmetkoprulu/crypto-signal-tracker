import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";

const route = Router();

export default (app: Router) => {
  route.post("/list", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200);
  });
};
