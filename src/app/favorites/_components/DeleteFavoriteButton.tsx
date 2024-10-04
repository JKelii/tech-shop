"use client";
import { deleteProductFromFavorite } from "@/actions/favorite";
import { Button } from "@/components/ui/button";
import { fa } from "@faker-js/faker";

import { X } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const DeleteFavoriteButton = ({
  favoriteId,
  session,
}: {
  favoriteId: string;
  session: Session | null;
}) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await deleteProductFromFavorite({
        favoriteProductId: favoriteId,
        email: session?.user?.email as string,
      });
      router.refresh();
      toast("Item removed from wishlist ❌");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast("An error occurred while removing the item");
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleClick}
      className="hover:bg-gray-300"
    >
      <X />
    </Button>
  );
};
