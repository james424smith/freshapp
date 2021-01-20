class RNSecureKeyStoreMock {
  store;

  constructor() {
    this.store = new Map();
    this.store.set("@MemoryStorage:temp", "temp");
    this.store.set("@MemoryStorage:temp2", "temp");
    this.store.set("@MemoryStorage:temp3", 0);
  }

  getItem(k) {
    const result = this.store.get(k);
    return Promise.resolve(result);
  }

  removeItem(k) {
    if (this.store.has(k)) {
      this.store.delete(k);
      return Promise.resolve(true);
    } else {
      throw Error("cannot find key");
    }
  }

  getAllKeys() {
    const results = Array.from(this.store.keys());
    return Promise.resolve(results);
  }

  setItem(k, value) {
    if (value !== undefined) {
      this.store.set(k, value);
      return Promise.resolve(true);
    } else {
      throw Error("cannot set value undefined");
    }
  }
}

const RNSecureKeyStore = new RNSecureKeyStoreMock();

export default RNSecureKeyStore;
