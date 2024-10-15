import { useState } from "react";

export const useSelectedProductQuantity = () => {
  const [selectedProductQuantity, setSelectedProductQuantity] = useState<
    number | null
  >(null);

  const onSelectedProductQuantity = (selectedQuantity: number) => {
    setSelectedProductQuantity(selectedQuantity);
  };

  return {
    selectedProductQuantity,
    onSelectedProductQuantity,
  };
};
