import { combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./slice/cartSlice";

const rootReducer = combineReducers({
  cart: CartReducer,
});

export default rootReducer;
