type UseSessionStorageAsCache = () => {storeInCache: StoreInCache, getFromCache: GetFromCache};
type StoreInCache = (key: string, value: string | any[] | {[key: string]: any}) => boolean;
type GetFromCache = (key: string) => {data: string | any[] | {[key: string]: any}, age: number} | false;

const useSessionStorageAsCache: UseSessionStorageAsCache = () => {
  const storeInCache: StoreInCache = (key, value) => {
    try {
      const payload = {data: value, age: Date.now()};
      window.sessionStorage.setItem(key, JSON.stringify(payload));
      return true;
    } catch {
      return false;
    }
  };

  const getFromCache: GetFromCache = (key) => {
    const item = window.sessionStorage.getItem(key);
    if (item) {
      const {data, age} = JSON.parse(item);
      return {data, age};
    } else {
      return false;
    }
  };

  return {storeInCache, getFromCache};
};

export default useSessionStorageAsCache;