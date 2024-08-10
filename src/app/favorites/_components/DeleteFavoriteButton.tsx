"use client";
import { deleteProductFromFavorite } from "@/actions/favorite";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import { toast } from "sonner";

export const DeleteFavoriteButton = ({
  favoriteId,
  session,
}: {
  favoriteId: string;
  session: Session | null;
}) => {
  const handleClick = async () => {
    console.log(favoriteId);
    const deleteFavorite = await deleteProductFromFavorite({
      favoriteProductId: favoriteId,
      email: session?.user?.email as string,
    });
    console.log(deleteFavorite);
    toast.success("Product removed from favorites");

    if (!deleteFavorite) {
      console.log("Error deleting favorite");
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
