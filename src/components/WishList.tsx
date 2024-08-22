"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { addToFavoriteAuthorized } from "@/actions/favorite";
import { cn } from "@/lib/utils";

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
  const { handleSubmit } = useForm();
  const { data: session } = useSession();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const email = session?.user?.email;
    if (!email) {
      toast({
        title: "You are not authorized",
        className: "bg-red-500/15",
        duration: 3000,
      });
      return;
    }

    addToFavoriteAuthorized({ email, slug });
    toast({
      title: "Added to wishlist",
      className: "bg-green-500/15",
      duration: 3000,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <button className="flex justify-center h-12 items-center gap-2 p-2 rounded-md border-2 border-gray-400 hover:translate-y-[2px]">
        <Heart
          size={20}
          className={cn(favoriteId && "fill-gray-500 text-gray-500")}
        />
        Add to wishlist
      </button>
    </form>
  );
};
