"use client";

import useShopContext from "@/hooks/useShopContext";
import { useState } from "react";

export const SizeRadioGroup = () => {
  const { size, setSize } = useShopContext();
  const [selectedSize, setSelectedSize] = useState(size);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
    setSelectedSize(e.target.value);
  };

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg">Size</h2>
      <div className="flex justify-center items-center gap-2">
        {sizes.map((size) => (
          <label
            key={size}
            htmlFor={size}
            className={`w-10 h-8 flex cursor-pointer justify-center px-2 gap-1 items-center rounded-md border-[1px] border-zinc-400 ${
              selectedSize === size
                ? "bg-black/90 text-gray-200"
                : "hover:bg-zinc-200"
            }`}
          >
            <input
              type="radio"
              name="size"
              value={size}
              id={size}
              onChange={handleChange}
              checked={selectedSize === size}
              className="hidden"
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
};
