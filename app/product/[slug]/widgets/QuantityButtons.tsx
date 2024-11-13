/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import PaystackPop from "@paystack/inline-js";

import {
  decQty,
  getQty,
  incQty,
  onAdd,
  resetQty,
} from "@/store/slice/cartSlice";
import { toast } from "react-toastify";

export default function QuantityButtons({ product }: { product: ProductType }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const qty = useSelector(getQty);

  async function handleBuyNow() {
    try {
      const data = await fetch(`/api/paystack/transaction/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "drprime.dev@gmail.com",
          amount: product.price * qty,
        }),
      });

      const res = await data.json();

      const popup = new PaystackPop({});

      popup.checkout({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: "drprime.dev@gmail.com",
        amount: product.price * qty * 100,
        ref: res?.data?.reference,
        onClose: () => {
          toast.error("Payment was not completed. Please try again.");
        },
        onSuccess: (response) => {
          dispatch(resetQty());
          router.push(`/success/${response.reference}`);
          toast.success("Payment completed successfully!");
        },
        onError: (error) => {
          toast.error(`An error occured: ${error}`);
        },
      });
    } catch (error: any) {
      toast.error(`Error initializing transaction: ${error}`);
    }
  }
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
        <button type="button" className="buy-now" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </>
  );
}
