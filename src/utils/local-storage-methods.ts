type SetLocalStorageValue = (
  key: string,
  value: string | any[] | { [key: string]: any },
) => boolean;
type GetLocalStorageValue = (
  key: string,
) => string | any[] | { [key: string]: any } | false;

export const setLocalStorageValue: SetLocalStorageValue = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const getLocalStorageValue: GetLocalStorageValue = (key) => {
  const item = window.localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  } else {
    return false;
  }
};
