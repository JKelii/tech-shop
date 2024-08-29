"use client";

import { useState } from "react";

export const SizeRadioGroup = () => {
  //TODO: Add size query

  const [selectedSize, setSelectedSize] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(e.target.value);
  };

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg">Size</h2>
      <div className="flex justify-start items-center gap-2">
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
            {/* TODO: ADD NextUi radio button */}
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
