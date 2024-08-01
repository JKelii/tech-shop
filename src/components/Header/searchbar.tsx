import React from "react";
import { twMerge } from "tailwind-merge";

type SearchbarType = {
  className?: string;
};

const Searchbar = ({ className }: SearchbarType) => {
  return (
    <form>
      <div className="relative lg:ml-20 ">
        <input
          type="text"
          className={twMerge(
            `m-2 rounded-lg  px-2 text-gray-400 py-2 border-2 border-gray-500`,
            className
          )}
          placeholder="Search for products"
        />
      </div>
    </form>
  );
};

export default Searchbar;
