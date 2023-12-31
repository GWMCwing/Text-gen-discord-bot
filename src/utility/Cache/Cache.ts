interface CacheData<T> {
  data: T | undefined;
  expiration: Date;
}

abstract class Cache<T1, T2> {
  protected cache: Map<T1, CacheData<T2>>;
  protected expirationLimit: number;

  constructor(expiration: number) {
    this.cache = new Map();
    this.expirationLimit = expiration;
  }
  protected abstract getFromSource(key: T1): Promise<T2 | undefined>;
  protected abstract setToSource(key: T1, value: T2): Promise<boolean>;

  private _get(key: T1): CacheData<T2> | undefined {
    const cacheData = this.cache.get(key);
    if (!cacheData) return undefined;
    if (cacheData.expiration.getTime() - Date.now() > this.expirationLimit) {
      this.cache.delete(key);
      return undefined;
    }
    return cacheData;
  }

  public async get(key: T1): Promise<T2 | undefined> {
    const data = this._get(key);
    if (data) return data.data;
    const newData = await this.getFromSource(key);
    if (newData) {
      this._set(key, newData);
      return newData;
    } else {
      this._set(key, undefined);
    }
    return undefined;
  }

  private _set(key: T1, value: T2 | undefined): void {
    this.cache.set(key, {
      data: value,
      expiration: new Date(Date.now() + this.expirationLimit),
    });
  }

  public async set(key: T1, value: T2): Promise<boolean> {
    this._set(key, value);
    const success = await this.setToSource(key, value);
    return success;
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

  public async has(key: T1, cacheOnly: boolean = false): Promise<boolean> {
    if (!cacheOnly) await this.get(key);
    return this.cache.has(key);
  }

  public removeExpired() {
    this.cache.forEach((value, key) => {
      if (value.expiration.getTime() - Date.now() > this.expirationLimit) {
        this.cache.delete(key);
      }
    });
  }
}

export default Cache;
