interface CacheData<T> {
  data: T;
  expiration: Date;
}

abstract class Cache<T1, T2> {
  protected cache: Map<T1, CacheData<T2>>;
  protected expirationLimit: number;

  constructor(expiration: number) {
    this.cache = new Map();
    this.expirationLimit = expiration;
  }
  protected abstract getFromSource(key: T1): T2 | undefined;
  protected abstract setToSource(key: T1, value: T2): void;

  private _get(key: T1): CacheData<T2> | undefined {
    const cacheData = this.cache.get(key);
    if (!cacheData) return undefined;
    if (cacheData.expiration.getTime() - Date.now() > this.expirationLimit) {
      this.cache.delete(key);
      return undefined;
    }
    return cacheData;
  }

  public get(key: T1): T2 | undefined {
    const data = this._get(key);
    if (data) return data.data;
    const newData = this.getFromSource(key);
    if (newData) {
      this._set(key, newData);
      return newData;
    }
    return undefined;
  }

  private _set(key: T1, value: T2): void {
    this.cache.set(key, {
      data: value,
      expiration: new Date(Date.now() + this.expirationLimit),
    });
  }

  public set(key: T1, value: T2): void {
    this.setToSource(key, value);
    this._set(key, value);
  }

  public delete(key: T1): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }

  public has(key: T1): boolean {
    return this.cache.has(key);
  }
}

export default Cache;
