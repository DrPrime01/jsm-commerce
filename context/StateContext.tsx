/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useContext, createContext } from "react";
import { toast } from "react-toastify";

const Context = createContext<any>(null);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cartItems")!) || [];
    }
    return [];
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: any;
  let index: number;

  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      else return prev - 1;
    });
  };

  const onAdd = (product: any, quantity: number) => {
    const checkIfProductInCart = cartItems?.find(
      (item: any) => item?._id === product?._id
    );
    setTotalPrice((prev) => prev + product?.price * quantity);
    setTotalQuantities((prev) => prev + quantity);
    if (checkIfProductInCart) {
      const updatedCartItems = cartItems?.map((item: any) => {
        if (item?._id === product?._id)
          return {
            ...item,
            quantity: item?.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product?.name} added to the cart`);
  };

  const onRemove = (id: any) => {
    foundProduct = cartItems.find((item: any) => item?._id === id);
    const newCartItems = cartItems?.filter((item: any) => item?._id !== id);
    setTotalPrice((prev) => prev - foundProduct?.price);
    setTotalQuantities((prev) => prev - 1);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: any, value: string) => {
    foundProduct = cartItems.find((item: any) => item?._id === id);
    index = cartItems.findIndex((product: any) => product?._id === id);
    const newCartItems = cartItems?.filter((item: any) => item?._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct?.quantity + 1 },
      ]);
      setTotalPrice((prev) => prev + foundProduct?.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct?.quantity - 1 },
        ]);
        setTotalPrice((prev) => prev - foundProduct?.price);
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useStateContext() {
  return useContext(Context);
}
