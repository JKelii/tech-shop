"use client";
import { deleteProductFromFavorite } from "@/actions/favorite";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { X } from "lucide-react";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const DeleteFavoriteButton = ({
  favoriteId,
}: {
  favoriteId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const session = useSession();

  const handleClick = async () => {
    try {
      const res = startTransition(async () => {
        await deleteProductFromFavorite({
          favoriteProductId: favoriteId,
          email: session?.data?.user?.email as string,
        });
      });
      if (res !== null) {
        toast("Item removed from wishlist ❌");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast("An error occurred while removing the item");
    }
    setTimeout(() => {
      router.refresh();
    }, 1000);
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
