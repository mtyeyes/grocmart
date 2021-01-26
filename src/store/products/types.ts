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