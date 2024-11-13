/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PaystackPop from "@paystack/inline-js";
import { useStateContext } from "@/context/StateContext";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCartItems,
  getCartItems,
  getTotalPrice,
  getTotalQuantities,
  onRemove,
  toggleCartItemQuantity,
} from "@/store/slice/cartSlice";
import { toast } from "react-toastify";

function Cart() {
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setShowCart } = useStateContext();
  const dispatch = useDispatch();
  const totalQuantities = useSelector(getTotalQuantities);
  const cartItems = useSelector(getCartItems);
  const totalPrice = useSelector(getTotalPrice);

  async function handlePayment() {
    try {
      const data = await fetch(`/api/paystack/transaction/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "drprime.dev@gmail.com",
          amount: totalPrice,
        }),
      });

      const res = await data.json();

      const popup = new PaystackPop({});

      popup.checkout({
        key: `${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
        email: "drprime.dev@gmail.com",
        amount: totalPrice * 100,
        ref: res?.data?.reference,
        onClose: () => {
          toast.error("Payment was not completed. Please try again.");
        },
        onSuccess: (response) => {
          dispatch(clearCartItems());
          setShowCart(false);
          router.push(`/success/${response.reference}`);
          toast.success("Payment completed successfully!");
        },
        onError: (error) => {
          toast.error(`An error occured: ${error}`);
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(`Error initializing transaction`);
    }
  }
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems?.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} className="self-center" />
            <h3>Your shopping bag is empty </h3>
            <Link href="/">
              <button
                className="btn w-full"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {cartItems?.length >= 1 && (
          <>
            <div className="product-container">
              {cartItems?.map((item: any) => (
                <div className="product" key={item?._id}>
                  <Image
                    src={urlFor(item?.image && item?.image[0]).url()}
                    alt=""
                    width={180}
                    height={150}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item?.name}</h5>
                      <h4>${item?.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() =>
                              dispatch(
                                toggleCartItemQuantity({
                                  id: item?._id,
                                  value: "dec",
                                })
                              )
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item?.quantity}</span>
                          <span
                            className="plus"
                            onClick={() =>
                              dispatch(
                                toggleCartItemQuantity({
                                  id: item?._id,
                                  value: "inc",
                                })
                              )
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => dispatch(onRemove({ id: item?._id }))}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button className="btn" type="button" onClick={handlePayment}>
                  Pay with Paystack
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
