import { CartItem } from "./cart-items";

export interface  Order {
    userId: string,
    orderitems: CartItem[],
    shipping: any
  }