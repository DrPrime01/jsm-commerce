"use client";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { StateContext } from "./StateContext";
import { store, persistor } from "@/store";

function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <StateContext>{children}</StateContext>
      </PersistGate>
    </Provider>
  );
}

export default ClientProvider;
