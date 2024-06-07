"use client";

import useShopContext from "@/hooks/useShopContext";
import { ShoppingCart } from "lucide-react";
import React from "react";

type AddToCartType = {
  slug: string;
  name: string;
  image: string;
  price: number;
};

export const AddToCartButton = ({
  slug,
  name,
  image,
  price,
}: AddToCartType) => {
  const { addToBasket } = useShopContext();

  const handleClick = (product: AddToCartType) => {
    addToBasket(product);
  };

  console.log(slug);

  return (
    <>
      <button
        className=" bg-black shadow-lg hover:translate-y-[2px] text-white font-bold h-12 py-2 px-4 rounded w-44"
        onClick={() => handleClick({ slug, name, image, price })}
      >
        <div className="flex justify-center items-center gap-4 self-center">
          <ShoppingCart size={20} />
          <p>Add to cart</p>
        </div>
      </button>
    </>
  );
};

export default AddToCartButton;
