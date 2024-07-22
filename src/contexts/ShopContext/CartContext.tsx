import React, { createContext, useState } from "react";

export type ProductInCart = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};

export type ShopContextType = {
  cart?: ProductInCart[] | null;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: (product: ProductInCart[]) => void;
  setCart: React.Dispatch<React.SetStateAction<ProductInCart[] | undefined>>;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

export const CartContext = ({
  children,
  cartFromDatabase,
}: {
  children: React.ReactNode;
  cartFromDatabase?: ProductInCart[];
}) => {
  const [cart, setCart] = useState<ProductInCart[] | undefined>(
    cartFromDatabase
  );
  const [quantity, setQuantity] = useState(1);
  return (
    <ShopContext.Provider
      value={{
        cart,
        setCart,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
