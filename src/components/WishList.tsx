"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  addToFavoriteAuthorized,
  deleteProductFromFavorite,
} from "@/actions/favorite";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ThreeDots } from "react-loader-spinner";

type Product = {
  id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  favoriteId: string | undefined;
};

export const WishList = ({ slug, favoriteId }: Product) => {
  const { handleSubmit } = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  //TODO: Create 2 separate functions
  const addToFavorites = async () => {};

  const onSubmit = handleSubmit(async (data) => {
    if (!favoriteId) {
      const email = session?.user?.email;
      try {
        if (!email) {
          toast("You are not authorized ❌");
          return;
        }
        if (email) {
          const res = await addToFavoriteAuthorized({ email, slug });

          if (res !== null) {
            toast("Added to wishlist ✅");
          }
          router.refresh();
        }
      } catch (error) {
        console.error("Error adding to favorites:", error);
        toast("An error occurred while adding the item");
      }
    }

    try {
      if (favoriteId) {
        const res = await deleteProductFromFavorite({
          favoriteProductId: favoriteId,
          email: session?.user?.email as string,
        });
        if (res !== null) {
          toast("Item removed from wishlist ❌");
        }
        router.refresh();
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast("An error occurred while removing the item");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Button
        disabled={isPending}
        variant={"outline"}
        className="flex justify-center h-12  w-44 items-center gap-2 p-2 rounded-md border-[1px] border-gray-400 hover:translate-y-[1px]"
      >
        <Heart
          size={20}
          className={cn(
            favoriteId ? "fill-gray-400 text-gray-400" : "text-gray-500/90"
          )}
        />
        {isPending ? (
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#000"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : favoriteId ? (
          <p className="text-gray-600">Remove favorite</p>
        ) : (
          <p className="text-gray-600">Add to wishlist </p>
        )}
      </Button>
    </form>
  );
};
