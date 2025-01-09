"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { deleteProductFromFavorite } from "@/actions/favorite";

import type { Session } from "next-auth";

export const DeleteFavoriteButton = ({
  favoriteId,
  session,
}: {
  favoriteId: string;
  session: Session | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    try {
      startTransition(async () => {
        await deleteProductFromFavorite({
          favoriteProductId: favoriteId,
          email: session?.user?.email as string,
        });
      });
      toast("Item removed from wishlist ❌");
      router.refresh();
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast("An error occurred while removing the item");
    }
  };

  return (
    <Button
      variant={"outline"}
      disabled={isPending}
      onClick={handleClick}
      className="hover:bg-gray-300"
    >
      {isPending ? (
        <ThreeDots
          visible={true}
          height="15"
          width="15"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <X />
      )}
    </Button>
  );
};
