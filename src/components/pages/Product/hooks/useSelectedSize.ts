import { useQueryState } from "nuqs";
import { useState } from "react";

export const useSelectedSize = () => {
  const [selectedSize, setSelectedSize] = useQueryState("size");
  const onSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return {
    onSizeSelect,
    selectedSize,
  };
};
