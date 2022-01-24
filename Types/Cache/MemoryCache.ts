import ICache, { CacheType } from "./ICache";

export default class MemoryCache implements ICache {
  static cache: Map<string, any> = new Map<string, any>();
  public static lock: boolean = false;

  set(key: string, value: object): void {
    while (MemoryCache.lock) {}

    MemoryCache.lock = true;

    MemoryCache.cache.set(key, value);

    MemoryCache.lock = false;
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    while (MemoryCache.lock) {}

    MemoryCache.lock = true;

    let value = MemoryCache.cache.get(key);

    MemoryCache.lock = false;

    if (!value) return defaultValue;

    return value as T;
  }

  clear(key: string): void {
    MemoryCache.cache.delete(key);
  }

  keys(): Array<string> {
    return [...MemoryCache.cache.keys()];
  }
}
