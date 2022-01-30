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
