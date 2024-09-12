"use client";
import { deleteProductFromFavorite } from "@/actions/favorite";
import { Button } from "@/components/ui/button";

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
    const deleteFavorite = await deleteProductFromFavorite({
      favoriteProductId: favoriteId,
      email: session?.user?.email as string,
    });
    toast("Item removed from wishlist ❌");
    router.refresh();
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
