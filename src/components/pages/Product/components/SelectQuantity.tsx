"use client";

import { updateCartQuantity } from "@/actions/cart";
import useShopContext from "@/hooks/useShopContext";
import React, { Dispatch, SetStateAction, useEffect } from "react";

const SelectQuantity = ({ productSlug }: { productSlug: string }) => {
  const { quantity, setQuantity } = useShopContext();

  const depriveQuantity = () => {
    setQuantity((prev) => prev - 1);
    if (quantity <= 1) {
      setQuantity((prev) => (prev = 1));
    }
    updateCartQuantity({ slug: productSlug, quantity });
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
    updateCartQuantity({ slug: productSlug, quantity });
  };

  return (
    <div className="flex gap-2">
      <p className="text-lg">Quantity:</p>
      <div className="flex gap-2">
        <button
          onClick={depriveQuantity}
          className="border-[1px] border-gray-500 w-6 rounded-sm hover:bg-gray-200"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={addQuantity}
          className="border-[1px] border-gray-500 w-6 rounded-sm hover:bg-gray-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SelectQuantity;
