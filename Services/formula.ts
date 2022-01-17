import FormulaModel, { Formula } from "../Models/formula";
import ServiceBase from "./Base/ServiceBase";
import ServiceReturn from "./Base/ServiceReturn";

export default class FormulaService
  extends ServiceBase
  implements IFormulaService
{
  formula = "MIDA - 1 > 0";

  public async addFormula(model: Formula): Promise<ServiceReturn<null>> {
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
      let list: Formula[] = [];

      if (err instanceof Error) {
        return this.Error(list, err.message);
      }

      return this.Error(list, "Something went wrong");
    }
  }
  //   public getDistinctVariables(): ServiceReturn {}
  //   private replaceVariables() {}
  //   public executeFormula(): ServiceReturn {}
}

export interface IFormulaService {
  addFormula(model: Formula): Promise<ServiceReturn<null>>;
  listFormulas(): Promise<ServiceReturn<Formula[]>>;
  //   executeFormula(): ServiceReturn;
  //   getDistinctVariables(): ServiceReturn;
}
