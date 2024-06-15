"use client";

import useShopContext from "@/hooks/useShopContext";
import { ShoppingCart } from "lucide-react";
import React from "react";

type AddToCartType = {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Product = {
  product: {
    slug: string;
    name: string;
    image: string;
    price: number;
    quantity?: number;
  };
};

export const AddToCartButton = ({
  slug,
  name,
  image,
  price,
}: AddToCartType) => {
  const { addToBasket, quantity } = useShopContext();

  const handleClick = (product: Product, quantity: number) => {
    addToBasket({ ...product, quantity });
  };

  console.log(slug);

  return (
    <>
      <button
        className=" bg-black shadow-lg hover:translate-y-[2px] text-white font-bold h-12 py-2 px-4 rounded w-44"
        onClick={() => handleClick({ slug, name, image, price }, quantity)}
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
