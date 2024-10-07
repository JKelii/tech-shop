import { useState } from "react";

export const useSelectedSize = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return {
    selectedSize,
    setSelectedSize,
  };
};
