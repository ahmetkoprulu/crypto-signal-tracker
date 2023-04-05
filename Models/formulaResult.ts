import PairResult from "./pairResult";

export default class FormulaResult {
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
