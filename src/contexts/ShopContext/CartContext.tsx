"use client";
import React, { createContext, useState } from "react";

type Product = {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  size?: string;
};

export type ShopContextType = {
  basket: Product[] | null;
  addToBasket: (product: Product) => void;
  setBasket: React.Dispatch<React.SetStateAction<Product[]>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  product: Product[] | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  wishlist: Product[];
  setWishlist: React.Dispatch<React.SetStateAction<Product[] | null>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

export const CartContext = ({ children }: { children: React.ReactNode }) => {
  const [quantity, setQuantity] = useState(1);
  const [basket, setBasket] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[] | null>(null);
  const [size, setSize] = useState("S");

  const addToBasket = (product: Product) => {
    setBasket((currentBasket) => [...currentBasket, product]);
  };

  return (
    <ShopContext.Provider
      value={{
        size,
        setSize,
        wishlist,
        setWishlist,
        basket,
        setBasket,
        addToBasket,
        quantity,
        setQuantity,
        product,
        setProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
