import { useState } from "react";

export const useSelectedSize = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const onSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return {
    onSizeSelect,
    selectedSize,
  };
};
