"use client";

import React from "react";

import { useQuantityProduct } from "../hooks/useQuantityProduct";

const SelectQuantity = ({ quantity }: { quantity: number }) => {
  const { depriveQuantity, addQuantity } = useQuantityProduct();
  return (
    <div className="flex gap-2">
      <p className="text-lg">Quantity:</p>
      <div className="flex gap-2">
        <button
          onClick={depriveQuantity}
          className="w-6 rounded-sm border border-gray-500 hover:bg-gray-200"
        >
          -
        </button>
        <p className="w-4 text-center">{quantity}</p>
        <button
          onClick={addQuantity}
          className="w-6 rounded-sm border border-gray-500 hover:bg-gray-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SelectQuantity;
