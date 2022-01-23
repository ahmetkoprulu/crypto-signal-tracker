import { Formula } from "@/Models/formula";
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
      const DTO = await service.listFormulas();

      return res.status(DTO.code).json({
        message: DTO.message,
        data: DTO.data,
      });
    }
  );

  route.post(
    "/create",
    async (req: Request, res: Response, next: NextFunction) => {
      let service = new FormulaService();
      var model = req.body as Formula;
      const DTO = await service.createFormula(model);

      return res.status(DTO.code).json({
        message: DTO.message,
        data: DTO.data,
      });
    }
  );

  route.put(
    "/update",
    async (req: Request, res: Response, next: NextFunction) => {
      let service = new FormulaService();
      var model = req.body as Formula;
      const DTO = await service.updateFormula(model);

      return res.status(DTO.code).json({
        message: DTO.message,
        data: DTO.data,
      });
    }
  );

  route.delete(
    "/delete/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      let service = new FormulaService();
      var id = req.params.id as string;
      console.log(id);
      const DTO = await service.deleteFormula(id);

      return res.status(DTO.code).json({
        message: DTO.message,
        data: DTO.data,
      });
    }
  );
};
