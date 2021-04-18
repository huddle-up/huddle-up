export class AuthStorage {
  constructor(private storage: Storage, private keyPrefix: string) {}

  private buildKey(key: string) {
    return `${this.keyPrefix}-${key}`;
  }

  get(key: string) {
    return this.storage.getItem(this.buildKey(key));
  }

  set(key: string, value: string) {
    this.storage.setItem(this.buildKey(key), value);
  }

  delete(key: string) {
    this.storage.removeItem(this.buildKey(key));
  }
}
