interface StoreInCache {
  (key: string, data: StoredData): boolean;
}
interface GetFromCache {
  (key: string): { data: StoredData; age: number } | false;
}

type StoredData = string | any[] | { [key: string]: any };

export const storeInCache: StoreInCache = (key, data) => {
  try {
    const payload = { data, age: Date.now() };
    window.sessionStorage.setItem(key, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
};

export const getFromCache: GetFromCache = (key) => {
  const item = window.sessionStorage.getItem(key);
  if (item) {
    const { data, age } = JSON.parse(item);
    return { data, age };
  } else {
    return false;
  }
};
