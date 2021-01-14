export type ProductsState = {[key: string]: ProductInfo};

export interface ProductInfo {
  name: string,
  group: string,
  price: number,
  dateOfArrival: string,
  weight: number,
  description: string,
  userScore: number[],
  currentUserScore?: number | null,
}

export const LOAD_PRODUCTS_STATE = 'LOAD_PRODUCTS_STATE';

interface LoadProductsAction {
  type: typeof LOAD_PRODUCTS_STATE,
  payload: ProductsState,
}

export const SET_CURRENT_USER_SCORE = 'SET_CURRENT_USER_SCORE';

interface SetCurrentUserScoreAction {
  type: typeof SET_CURRENT_USER_SCORE,
  payload: {productId: string, rating: number},
}

export const REMOVE_CURRENT_USER_SCORE = 'REMOVE_CURRENT_USER_SCORE';

interface RemoveCurrentUserScoreAction {
  type: typeof REMOVE_CURRENT_USER_SCORE,
  payload: {productId: string, rating: number},
}

export type ProductsActionTypes = LoadProductsAction | SetCurrentUserScoreAction | RemoveCurrentUserScoreAction;