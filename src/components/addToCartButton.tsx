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
        className="bg-mainBg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-44"
        onClick={() => handleClick({ slug, name, image, price })}
      >
        <div className="flex justify-center items-center gap-4">
          Add to cart
          <ShoppingCart />
        </div>
      </button>
    </>
  );
};

export default AddToCartButton;
