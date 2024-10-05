"use client";
import { deleteProductFromFavorite } from "@/actions/favorite";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

export const DeleteFavoriteButton = ({
  favoriteId,
  session,
}: {
  favoriteId: string;
  session: Session | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    try {
      startTransition(async () => {
        await deleteProductFromFavorite({
          favoriteProductId: favoriteId,
          email: session?.user?.email as string,
        });
      });
      router.refresh();
      toast("Item removed from wishlist ❌");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast("An error occurred while removing the item");
    }
    router.refresh();
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
