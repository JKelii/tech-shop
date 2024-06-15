"use client";

import useShopContext from "@/hooks/useShopContext";
import React from "react";

const SelectQuantity = () => {
  const { quantity, setQuantity } = useShopContext();

  const depriveQuantity = () => {
    setQuantity((prev) => prev - 1);
    if (quantity <= 1) {
      setQuantity((prev) => (prev = 1));
    }
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={depriveQuantity}
          className="border-[1px] border-gray-500 w-6 rounded-sm"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={addQuantity}
          className="border-[1px] border-gray-500 w-6 rounded-sm"
        >
          +
        </button>
      </div>
    </>
  );
};

export default SelectQuantity;
