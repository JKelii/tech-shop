import { Heart } from "lucide-react";
import React from "react";

export const WishList = () => {
  return (
    <>
      <button className="flex justify-center h-12 items-center gap-2 p-2 rounded-md border-2 border-gray-400 hover:translate-y-[2px]">
        <Heart size={20} />
        Add to wishlist
      </button>
    </>
  );
};
