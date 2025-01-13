import { useState } from "react";

export const useQuantityProduct = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const depriveQuantity = () => {
    setSelectedQuantity((prev) => prev - 1);
    if (selectedQuantity <= 1) {
      setSelectedQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const addQuantity = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  return {
    depriveQuantity,
    addQuantity,
    selectedQuantity,
    setSelectedQuantity,
  };
};
