export {};

declare global {
  type ProductType = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  };

  type CartSliceType = {
    cartItems: ProductType[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
  };
}
