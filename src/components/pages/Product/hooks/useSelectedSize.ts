import { useQueryState } from "nuqs";

export const useSelectedSize = () => {
  const [selectedSize, setSelectedSize] = useQueryState("size");
  const onSizeSelect = async (size: string) => {
    await setSelectedSize(size);
  };

  return {
    onSizeSelect,
    selectedSize,
  };
};
