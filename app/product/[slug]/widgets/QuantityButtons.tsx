/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { decQty, getQty, incQty, onAdd } from "@/store/slice/cartSlice";

export default function QuantityButtons({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  const qty = useSelector(getQty);
  return (
    <>
      <div className="quantity">
        <h3>Quantity:</h3>
        <p className="quantity-desc">
          <span className="minus" onClick={() => dispatch(decQty())}>
            <AiOutlineMinus />
          </span>
          <span className="num">{qty}</span>
          <span className="plus" onClick={() => dispatch(incQty())}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="add-to-cart"
          onClick={() => dispatch(onAdd({ product, quantity: qty }))}
        >
          Add to Cart
        </button>
        <button type="button" className="buy-now">
          Buy Now
        </button>
      </div>
    </>
  );
}
