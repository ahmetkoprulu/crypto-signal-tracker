export function addOrUpdateToArrayValue<T, Y>(
  dict: Map<T, Array<Y>>,
  key: T,
  value: Y
) {
  var exist = dict.get(key);
  if (!exist) {
    dict.set(key, [value]);

    return;
  }

  var existVal = exist.findIndex((x) => x == value);
  if (existVal > -1) return;

  exist.push(value);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function replaceIndicators(
  formula: string,
  handler: (indicator: string) => string
): string {
  var regex = /(\S[a-zA-Z]+)/gm;
  formula.replace(regex, handler);

  return formula;
}

export function evaluateCondition(condition: string): boolean {
  return eval(condition);
}

export function objectToMap(o: any) {
  return new Map(Object.entries(o));
}
