import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateKeys, AppState } from '../store/index';
import useLocalStorage from './use-local-storage';

type UseSync = (key: StateKeys) => void

const useSyncStateWithLocalStorage: UseSync = (key) => {
  const { getLocalStorageValue, setLocalStorageValue } = useLocalStorage();
  const keyValueInState = useSelector(((state: AppState) => state[key]));
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    if (firstRender.current) {
      firstRender.current = false;
      const initialValue = getLocalStorageValue(key);
      if (initialValue) {dispatch({type: `LOAD_${key.toUpperCase()}_STATE`, payload: initialValue})}
    } else {
      setLocalStorageValue(key, keyValueInState as any);
    }
  },[keyValueInState]);
};

export default useSyncStateWithLocalStorage;