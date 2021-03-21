import { useDispatch, useStore } from 'react-redux';

import { AppDispatch } from '../store/index';
import { StateKeys } from '../store/index';

type RequestResults<T extends string> = {
  [K in T]?: any;
};

const useLoadState = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentState = useStore().getState();

  const loadState = (requestResults: RequestResults<StateKeys>) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if (Object.keys(currentState[key]).length !== 0) {
        return;
      }
      switch (key) {
        case 'products':
          dispatch({ type: 'LOAD_PRODUCTS_STATE', payload: data });
          break;
        case 'discounts':
          dispatch({ type: 'LOAD_DISCOUNTS_STATE', payload: data });
          break;
        case 'cart':
          dispatch({ type: 'LOAD_CART_STATE', payload: data });
          break;
      }
    });
  };

  return loadState;
};

export default useLoadState;
