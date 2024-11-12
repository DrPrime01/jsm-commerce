import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: CartSliceType = {
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};

const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incQty: (state) => {
      state.qty = state.qty + 1;
    },
    decQty: (state) => {
      if (state.qty > 1) {
        state.qty = state.qty - 1;
      }
    },
    onAdd: (state, { payload: { product, quantity } }) => {
      const currentProduct = state.cartItems?.find(
        (item) => item?._id === product?._id
      );
      if (currentProduct) {
        currentProduct.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      state.totalPrice += product.price * quantity;
      state.totalQuantities += quantity;
      toast.success(`${state.qty} ${product?.name} added to the cart`);
    },
    onRemove: (state, { payload: { id } }) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item?._id === id
      );

      if (productIndex !== -1) {
        const productInCart = state.cartItems[productIndex];

        state.cartItems.splice(productIndex, 1);
        state.totalPrice -= productInCart.price * productInCart.quantity;
        state.totalQuantities -= productInCart.quantity;
      }
    },
    toggleCartItemQuantity: (state, { payload: { id, value } }) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item?._id === id
      );

      if (productIndex !== -1) {
        const productInCart = state.cartItems[productIndex];

        if (value === "inc") {
          productInCart.quantity += 1;
          state.totalQuantities += 1;
          state.totalPrice += productInCart.price;
        } else if (value === "dec" && productInCart.quantity > 1) {
          productInCart.quantity -= 1;
          state.totalQuantities -= 1;
          state.totalPrice -= productInCart.price;
        }
      }
    },
  },
});

const { actions, reducer } = authSlice;

export const { incQty, decQty, onAdd, onRemove, toggleCartItemQuantity } =
  actions;

export const getCartItems = (store: { cart: CartSliceType }) =>
  store.cart.cartItems;
export const getTotalQuantities = (store: { cart: CartSliceType }) =>
  store.cart.totalQuantities;
export const getTotalPrice = (store: { cart: CartSliceType }) =>
  store.cart.totalPrice;
export const getQty = (store: { cart: CartSliceType }) => store.cart.qty;

export default reducer;
