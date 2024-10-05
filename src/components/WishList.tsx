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

export const WishList = ({
  slug,

  favoriteId,
}: Product) => {
  const { handleSubmit } = useForm();
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit(async (data) => {
    if (!favoriteId) {
      const email = session?.user?.email;
      if (!email) {
        toast("You are not authorized ❌");
        return;
      }
      if (email) {
        startTransition(async () => {
          await addToFavoriteAuthorized({ email, slug });
          router.refresh();
          toast("Added to wishlist ✅");
        });
      }
    }
    if (favoriteId) {
      try {
        startTransition(async () => {
          await deleteProductFromFavorite({
            favoriteProductId: favoriteId,
            email: session?.user?.email as string,
          });
          router.refresh();
          toast("Item removed from wishlist ❌");
        });
      } catch (error) {
        console.error("Error removing from favorites:", error);
        toast("An error occurred while removing the item");
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Button
        disabled={isPending}
        variant={"outline"}
        className="flex justify-center h-12 w-44 items-center gap-2 p-2 rounded-md border-2 border-gray-400 hover:translate-y-[2px]"
      >
        <Heart
          size={20}
          className={cn(favoriteId && "fill-gray-500 text-gray-500")}
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
          <p>Remove favorite</p>
        ) : (
          <p>Add to wishlist </p>
        )}
      </Button>
    </form>
  );
};
