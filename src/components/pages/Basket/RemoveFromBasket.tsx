"use client";
import { removeFromCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

type RemoveFromBasketType = {
  productId: string;
  product: {
    slug: string;
    quantity: number;
  };
};

const RemoveFromBasket = ({ productId }: RemoveFromBasketType) => {
  console.log(productId);
  const session = useSession();
  const handleDelete = async () => {
    const updatedCart = await removeFromCart(productId);
    toast({
      title: "Item removed from cart ❌",
      className: "bg-red-500/15",
      duration: 3000,
    });
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
