export default class ConditionResult {
  condition: string;
  success: boolean = false;

  constructor(condition: string, success: boolean) {
    this.condition = condition;
    this.success = success;
  }
}
