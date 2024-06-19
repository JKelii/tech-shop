"use client";

import useShopContext from "@/hooks/useShopContext";
import { Heart } from "lucide-react";
import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export const WishList = () => {
  const { wishlist, setWishlist } = useShopContext();

  return (
    <>
      <button className="flex justify-center h-12 items-center gap-2 p-2 rounded-md border-2 border-gray-400 hover:translate-y-[2px]">
        <Heart size={20} />
        Add to wishlist
      </button>
    </>
  );
};
