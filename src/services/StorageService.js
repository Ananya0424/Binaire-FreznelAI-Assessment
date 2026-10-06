class StorageService {
  constructor(storageKeyPrefix) {
    this.prefix = storageKeyPrefix;
  }

  get(uid) {
    try {
      const data = localStorage.getItem(`${this.prefix}_${uid}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  }

  save(uid, data) {
    try {
      localStorage.setItem(`${this.prefix}_${uid}`, JSON.stringify(data));
      return true;
    } catch (error) {
      return false;
    }
  }

  add(uid, item) {
    const list = this.get(uid);
    if (!list.some(i => i.id === item.id)) {
      list.push(item);
      this.save(uid, list);
      return true;
    }
    return false;
  }

  remove(uid, itemId) {
    const list = this.get(uid);
    const updated = list.filter(i => i.id !== itemId);
    this.save(uid, updated);
  }

  has(uid, itemId) {
    const list = this.get(uid);
    return list.some(i => i.id === itemId);
  }
}

export const wishlistStorage = new StorageService('wishlist');
