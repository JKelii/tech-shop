"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useReducer, useState } from "react";
import { useForm } from "react-hook-form";

import { addToFavoriteAuthorized } from "@/actions/favorite";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  favoriteId: string | undefined;
};

export const WishList = ({
  id,
  name,
  price,
  slug,
  image,
  favoriteId,
}: Product) => {
  const router = useRouter();
  const { handleSubmit } = useForm();
  const { data: session } = useSession();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const email = session?.user?.email;
    if (!email) {
      toast("You are not authorized ❌");
      return;
    }
    if (!favoriteId) {
      await addToFavoriteAuthorized({ email, slug });
      router.refresh();
      toast("Added to wishlist ✅");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Button
        variant={"outline"}
        className="flex justify-center h-12 w-44 items-center gap-2 p-2 rounded-md border-2 border-gray-400 hover:translate-y-[2px]"
      >
        <Heart
          size={20}
          className={cn(favoriteId && "fill-gray-500 text-gray-500")}
        />
        {favoriteId ? <p>Remove from favorites</p> : <p>Add to wishlist</p>}
      </Button>
    </form>
  );
};
