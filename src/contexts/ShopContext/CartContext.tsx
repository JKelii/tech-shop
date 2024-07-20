import React, { createContext, useState } from "react";

export type ProductInCart = {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};

export type ShopContextType = {
  cart?: ProductInCart[] | null;
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

  return (
    <ShopContext.Provider
      value={{
        cart,

        setCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
