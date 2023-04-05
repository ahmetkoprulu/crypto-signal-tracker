import Logger from "../Loaders/logger";
import FormulaService from "../Services/formula";
import Twelvedata from "../Common/twelvedata";
import MemoryCache from "../Common/Cache/MemoryCache";
import ICache from "../Common/Cache/ICache";
import { delay, evaluateCondition, replaceIndicators } from "../Common/helpers";
import Indicator from "@/Types/indicator";

export default async function EvaluateFormula(job: any): Promise<void> {
  Logger.debug("✌️ Formula Execution Job is triggered!");
  var cache: ICache = new MemoryCache();

  try {
    let service = new FormulaService();
    const DTO = await service.listFormulas();

    if (!DTO.isSucess) {
      Logger.error(
        "🔥 Error with Formula Evaluation Job: Could not fetch formulas."
      );

      return;
    }

    var results = new Array<FormulaResult>();
    for (let formula of DTO.data) {
      var formualResult = new FormulaResult(formula._id);

      formula.pairs.forEach((x) => {
        formula.conditions.forEach((y) => {});
      });

      formula.conditions.forEach((x) => {
        var readyFormula = replaceIndicators(x, (indicator) => {
          return cache.get(indicator, "0")!;
        });

        if (!readyFormula) return;

        var success = evaluateCondition(readyFormula);
        // formualResult.addCondition(formula.).push(new ConditionResult(x, success));
      });

      console.log();
    }
  } catch (e) {
    Logger.error("🔥 Error with Formula Execution Job: %o", e);
  }
}

class FormulaResult {
  formulaId: string;
  pairs: Map<string, PairResult> = new Map<string, PairResult>();

  constructor(formulaId: string) {
    this.formulaId = formulaId;
  }

  public addPair(pair: string, result: PairResult) {
    this.pairs.set(pair, result);
  }

  public addCondition(pair: string, condition: string, success: boolean): void {
    var p = this.pairs.get(pair);
    if (!p) {
      var pResult = new PairResult(pair);
      this.pairs.set(pair, pResult);
      pResult.addCondition(condition, success);

      return;
    }

    p.addCondition(condition, success);
  }
}

enum SignalState {
  Unknown = 0,
  Success = 10,
  Warning = 20,
  Failed = 30,
}

class PairResult {
  pair: string;
  conditions: Array<ConditionResult> = new Array<ConditionResult>();

  public get state(): SignalState {
    var successCount = this.conditions.filter((x) => x.success).length;

    let percentage = (this.conditions.length / successCount) * 100;

    if (percentage >= 80) return SignalState.Success;
    else if (percentage >= 50 && percentage < 80) return SignalState.Warning;

    return SignalState.Failed;
  }

  constructor(pair: string) {
    this.pair = pair;
  }

  public addCondition(condition: string, success: boolean): void {
    this.conditions.push(new ConditionResult(condition, success));
  }
}

class ConditionResult {
  condition: string;
  success: boolean = false;

  constructor(condition: string, success: boolean) {
    this.condition = condition;
    this.success = success;
  }
}

function getIndicatorValue() {}
