"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";

import { Button } from "../../../ui/button";

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

export const WishList = ({ slug, favoriteId }: Product) => {
  const { handleSubmit } = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const present = Boolean(favoriteId);

  const addFavorite = async () => {
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
  };

  const onSubmit = handleSubmit(() => {
    if (!favoriteId) {
      startTransition(async () => {
        await addFavorite();
      });
      setTimeout(() => {
        router.refresh();
      }, 1400);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Button
        disabled={isPending || present}
        variant={"outline"}
        className="flex h-12 w-36 items-center justify-center gap-2 rounded-md border border-gray-400 p-2 hover:translate-y-px md:w-44"
      >
        {!isPending ? (
          <>
            <Heart
              size={20}
              className={cn(
                favoriteId ? "fill-gray-400 text-gray-400" : "text-gray-500/90",
              )}
            />
            <p className="text-gray-600">Add to wishlist </p>
          </>
        ) : (
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
        )}
      </Button>
    </form>
  );
};
