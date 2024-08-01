"use client";

import { checkCart } from "@/actions/cart";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

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

  quantity,
}: AddToCartType) => {
  const { handleSubmit } = useForm();

  const session = useSession();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    checkCart({ product: { slug, quantity }, email: session.data?.email });
    toast({
      title: "Item added to cart ✔",
      className: "bg-green-500/15",
      duration: 3000,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <button className=" bg-black shadow-lg hover:translate-y-[2px] text-white font-bold h-12 py-2 px-4 rounded w-44">
        <div className="flex justify-center items-center gap-2 md:gap-4 self-center">
          <ShoppingCart size={20} />
          <p>Add to cart</p>
        </div>
      </button>
      <Toaster style="text-green-600" />
    </form>
  );
};

export default AddToCartButton;
