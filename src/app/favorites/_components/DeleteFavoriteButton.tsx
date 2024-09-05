"use client";
import {
  deleteProductFromFavorite,
  getFavoriteAuthorized,
} from "@/actions/favorite";
import { Button } from "@/components/ui/button";
import { getFavorites } from "@/lib";

import { X } from "lucide-react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
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
