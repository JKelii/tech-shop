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
import { start } from "repl";

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

          toast("Added to wishlist ✅");
        });
        router.refresh();
      }
    }
    if (favoriteId) {
      try {
        startTransition(async () => {
          await deleteProductFromFavorite({
            favoriteProductId: favoriteId,
            email: session?.user?.email as string,
          });
          toast("Item removed from wishlist ❌");
        });
        router.refresh();
      } catch (error) {
        console.error("Error removing from favorites:", error);
        toast("An error occurred while removing the item");
      }
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
        Add to wishlist
      </Button>
    </form>
  );
};
