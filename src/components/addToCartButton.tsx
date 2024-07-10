"use client";

import { checkCart } from "@/actions/cart";
import useShopContext from "@/hooks/useShopContext";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

type AddToCartType = {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};

type Product = {
  product: {
    slug: string;
    name: string;
    image: string;
    price: number;
    quantity?: number;
    size?: string;
  };
};

export const AddToCartButton = ({
  slug,
  name,
  image,
  price,
  quantity,
}: AddToCartType) => {
  const { handleSubmit } = useForm();

  const session = useSession();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    checkCart({ slug, quantity, email: session.data?.email });
  });

  return (
    <form onSubmit={onSubmit}>
      <button className=" bg-black shadow-lg hover:translate-y-[2px] text-white font-bold h-12 py-2 px-4 rounded w-44">
        <div className="flex justify-center items-center gap-2 md:gap-4 self-center">
          <ShoppingCart size={20} />
          <p>Add to cart</p>
        </div>
      </button>
    </form>
  );
};

export default AddToCartButton;
