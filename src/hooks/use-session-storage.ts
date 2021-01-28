type UseSessionStorage = () => {setSessionStorageValue: SetSessionStorageValue, getSessionStorageValue: GetSessionStorageValue};
type SetSessionStorageValue = (key: string, value: string | any[] | {[key: string]: any}) => boolean;
type GetSessionStorageValue = (key: string) => {data: string | any[] | {[key: string]: any}, age: number} | false;

const useSessionStorage: UseSessionStorage = () => {
  const setSessionStorageValue: SetSessionStorageValue = (key, value) => {
    try {
      const payload = {data: value, age: Date.now()};
      window.sessionStorage.setItem(key, JSON.stringify(payload));
      return true;
    } catch {
      return false;
    }
  };

  const getSessionStorageValue: GetSessionStorageValue = (key) => {
    const item = window.sessionStorage.getItem(key);
    if (item) {
      const {data, age} = JSON.parse(item);
      return {data, age};
    } else {
      return false;
    }
  };

  return {setSessionStorageValue, getSessionStorageValue};
};

export default useSessionStorage;