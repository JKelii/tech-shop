import { useEffect, useState } from "react";
import { useSelectedSize } from "../hooks/useSelectedSize";

export type ProductType = {
  size: Array<{
    productVariantSize: Array<{
      name?: string | null;
      productQuantity: Array<number>;
    }>;
  }>;
};

export const SizeRadioGroup = ({ product }: { product: ProductType }) => {
  const { selectedSize, setSelectedSize } = useSelectedSize();

  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    setSelectedSize(size);
    const sizeIndex = product.size[0].productVariantSize.findIndex(
      (item) => item.name === size
    );
    if (sizeIndex !== -1) {
      setSelectedQuantity(
        product.size[0].productVariantSize[sizeIndex].productQuantity[0]
      );
    }
  };

  const sizes = product.size[0].productVariantSize.map((size) => size.name);
  const options = ["128GB", "256GB", "512GB", "1TB"];
  const isOptionSize = sizes.some((size) => options.includes(size as string));

  return (
    <div className="flex flex-col gap-2 mb-4">
      <h2 className="text-lg font-bold">
        {isOptionSize ? "Memory Storage:" : "Size:"}
      </h2>
      <div className="flex justify-start items-center gap-2">
        {sizes &&
          sizes.map((size) => (
            <label key={size} className={`flex-1 cursor-pointer`}>
              <input
                type="radio"
                name="size"
                value={size || ""}
                checked={selectedSize === size}
                onChange={handleChange}
                className="sr-only"
              />
              <span
                className={`flex justify-center items-center text-center py-2 h-10 px-2 w-10 border rounded-md transition-colors ${
                  selectedSize === size
                    ? "bg-black text-primary-foreground border-primary"
                    : "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground"
                } ${
                  size === "Standard" ? "w-32 text-semibold tracking-wide" : ""
                }`}
              >
                {size}
              </span>
            </label>
          ))}
      </div>
      {selectedQuantity !== null && (
        <p className="text-sm text-muted-foreground">
          Stock: {selectedQuantity}
        </p>
      )}
    </div>
  );
};
