/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useStateContext } from "@/context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function QuantityButtons({ product }: { product: any }) {
  const { incQty, decQty, qty, onAdd } = useStateContext();
  return (
    <>
      <div className="quantity">
        <h3>Quantity:</h3>
        <p className="quantity-desc">
          <span className="minus" onClick={decQty}>
            <AiOutlineMinus />
          </span>
          <span className="num">{qty}</span>
          <span className="plus" onClick={incQty}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="add-to-cart"
          onClick={() => onAdd(product, qty)}
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
