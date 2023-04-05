import ConditionResult from "./conditionResult";

export default class PairResult {
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

  public addCondition(condition: string, success: boolean) {
    this.conditions.push(new ConditionResult(condition, success));
  }
}

export enum SignalState {
  Unknown = 0,
  Success = 10,
  Warning = 20,
  Failed = 30,
}
