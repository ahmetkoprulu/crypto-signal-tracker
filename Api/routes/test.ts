import { Formula } from "../../Models/database/formula";
import { Router, Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import FormulaService from "../../Services/formula";

const route = Router();

export default (app: Router) => {
  app.use("/test", route);

  route.post(
    "/create",
    async (req: Request, res: Response, next: NextFunction) => {
      var model = req.body;
      console.log(model);

      return res.status(200).json(model);
    }
  );
};
