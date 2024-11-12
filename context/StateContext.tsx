/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useContext, createContext } from "react";

const Context = createContext<any>(null);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useStateContext() {
  return useContext(Context);
}
