import FormulaModel, { Formula } from "../Models/formula";
import ServiceBase from "./Base/ServiceBase";
import ServiceReturn from "./Base/ServiceReturn";

export default class FormulaService
  extends ServiceBase
  implements IFormulaService
{
  formula = "MIDA - 1 > 0";

  public async createFormula(model: Formula): Promise<ServiceReturn<null>> {
    try {
      var entity = new FormulaModel({
        equation: model.equation,
        pairs: model.pairs,
      });
      await entity.save();

      return this.Success(null, "Formula created successfully.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        return this.Error(null, err.message);
      }

      return this.Error(null, "Something went wrong");
    }
  }

  public async listFormulas(): Promise<ServiceReturn<Formula[]>> {
    try {
      var list: Formula[] = await FormulaModel.find({});

      return this.Success(list, "Formulas listed successfully.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        return this.Error([], err.message);
      }

      return this.Error([], "Something went wrong");
    }
  }

  public async updateFormula(model: Formula): Promise<ServiceReturn<null>> {
    try {
      var formula = await FormulaModel.findOne({ _id: model._id });
      if (formula == null) return this.NotFound("Formula Not Found");

      formula.equation = model.equation;
      formula.pairs = model.pairs;

      formula.update();

      return this.Success(null, "Formula updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        return this.Error(null, err.message);
      }

      return this.Error(null, "Something went wrong");
    }
  }

  public async deleteFormula(id: string): Promise<ServiceReturn<null>> {
    try {
      await FormulaModel.deleteOne({
        _id: id,
      });

      return this.Success(null, "Formula deleted successfully.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        return this.Error(null, err.message);
      }

      return this.Error(null, "Something went wrong");
    }
  }
  //   public getDistinctVariables(): ServiceReturn {}
  //   private replaceVariables() {}
  //   public executeFormula(): ServiceReturn {}
}

export interface IFormulaService {
  createFormula(model: Formula): Promise<ServiceReturn<null>>;
  listFormulas(): Promise<ServiceReturn<Formula[]>>;
  updateFormula(model: Formula): Promise<ServiceReturn<null>>;
  deleteFormula(id: string): Promise<ServiceReturn<null>>;
  //   executeFormula(): ServiceReturn;
  //   getDistinctVariables(): ServiceReturn;
}
