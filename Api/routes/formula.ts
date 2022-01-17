import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import FormulaService from "../../Services/formula";

const route = Router();

export default (app: Router) => {
  app.use("/formulas", route);

  route.get(
    "/list",
    async (req: Request, res: Response, next: NextFunction) => {
      let service = new FormulaService();
      let listData = await service.listFormulas();

      return res.status(listData.code).json({
        message: listData.message,
        data: listData.data,
      });
    }
  );
};
