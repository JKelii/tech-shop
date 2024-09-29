"use client";
import { removeFromCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

type RemoveFromBasketType = {
  productId: string;
  product: {
    slug: string;
    quantity: number;
  };
};

const RemoveFromBasket = ({ productId }: RemoveFromBasketType) => {
  const session = useSession();
  const router = useRouter();
  const handleDelete = async () => {
    const updatedCart = await removeFromCart(productId);

    if (updatedCart) {
      toast("Item removed from cart ❌");
    }
    router.refresh();
  };

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <X className="h-6 w-6" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
};

export default RemoveFromBasket;
