"use client";

import {
  manageCart,
  ManageCartParams,
  updateCartQuantity,
} from "@/actions/cart";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import SelectQuantity from "./pages/Product/components/SelectQuantity";
import { SizeRadioGroup } from "./pages/Product/components/SizeRadioGroup";
import useShopContext from "@/hooks/useShopContext";

type AddToCartType = {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  manageCart: (params: ManageCartParams) => Promise<Error | void>;
};

export const AddToCartButton = ({ slug, manageCart }: AddToCartType) => {
  const { handleSubmit } = useForm();
  const session = useSession();
  const { toast } = useToast();

  const { quantity, setQuantity } = useShopContext();

  const depriveQuantity = () => {
    setQuantity((prev) => prev - 1);
    if (quantity <= 1) {
      setQuantity((prev) => (prev = 1));
    }
    updateCartQuantity({ slug, quantity });
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
    updateCartQuantity({ slug, quantity });
  };

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     startTransition(() => {
  //       manageCart();
  //     });
  //     toast({
  //       title: "Item added to cart ✔",
  //       className: "bg-green-500/15",
  //       duration: 3000,
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast({
  //         title: error.message,
  //         className: "bg-red-500/15",
  //         duration: 3000,
  //       });
  //     }
  //   }
  // });

  return (
    <form
      action={() =>
        manageCart({
          product: { slug, quantity },
          email: session.data?.email,
        })
      }
      className="flex flex-col"
    >
      <div className="flex flex-col gap-2">
        <SizeRadioGroup />
        <div className="flex gap-2">
          <p className="text-lg">Quantity:</p>
          <div className="flex gap-2">
            <button
              onClick={depriveQuantity}
              className="border-[1px] border-gray-500 w-6 rounded-sm hover:bg-gray-200"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={addQuantity}
              className="border-[1px] border-gray-500 w-6 rounded-sm hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className=" bg-black shadow-lg hover:translate-y-[2px] text-white font-bold h-12 py-2 px-4 rounded w-44"
      >
        <div className="flex justify-center items-center gap-2 md:gap-4 self-center">
          <ShoppingCart size={20} />
          <p>Add to cart</p>
        </div>
      </Button>
      <Toaster style="text-green-600" />
    </form>
  );
};

export default AddToCartButton;
