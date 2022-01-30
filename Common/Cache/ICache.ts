export default interface ICache {
  set(key: string, value: object): void;
  get<T>(key: string, defaultValue: T): T | undefined;
  clear(key: string): void;
  keys(): Array<string>;
}

export enum CacheType {
  String = 1,
  JSON = 2,
}
