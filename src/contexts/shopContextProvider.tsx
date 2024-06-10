"use client";
import React, { createContext, useState } from "react";

type Product = {
  slug: string;
  name: string;
  image: string;
  price: number;
};

export type ShopContextType = {
  basket: Product;
  addToBasket: (product: Product) => void;
  setBasket: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [basket, setBasket] = useState<Product[]>([]);
  const [product, setProduct] = useState(null);

  const addToBasket = (product: Product) => {
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
