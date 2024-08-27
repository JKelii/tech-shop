import { updateCartQuantity } from "@/actions/cart";
import { GetFavoriteByIdQuery } from "@/lib/hygraph/generated/graphql";
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

export type ProductInFavorite = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
};

type ShopContextType = {
  cart: ProductInCart[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<ProductInCart[] | undefined>>;
  favorite?: GetFavoriteByIdQuery;
  setFavorite: React.Dispatch<
    React.SetStateAction<GetFavoriteByIdQuery | undefined>
  >;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: (product: ProductInCart[]) => void;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

export const CartContext = ({
  children,
  favoriteFromDatabase,
  cartFromDatabase,
}: {
  children: React.ReactNode;
  cartFromDatabase?: ProductInCart[];
  favoriteFromDatabase?: GetFavoriteByIdQuery;
}) => {
  const [cart, setCart] = useState<ProductInCart[] | undefined>(
    cartFromDatabase
  );
  const [favorite, setFavorite] = useState<GetFavoriteByIdQuery | undefined>(
    favoriteFromDatabase
  );

  const [quantity, setQuantity] = useState(1);

  return (
    <ShopContext.Provider
      value={{
        favorite,
        setFavorite,
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
