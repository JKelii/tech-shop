"use client";
import React, { createContext, useState } from "react";

export type ShopContextType = {
  basket: string[];
  addToBasket: (item: string) => void;
  setBasket: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [basket, setBasket] = useState<string[]>([]);
  const [product, setProduct] = useState(null);

  const addToBasket = (product: string) => {
    setBasket((currentBasket) => {
      const newBasket = [...currentBasket, product];
      return newBasket;
    });
  };

  return (
    <ShopContext.Provider value={{ basket, setBasket, addToBasket }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
