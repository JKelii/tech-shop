import React from "react";
import { twMerge } from "tailwind-merge";

type SearchbarType = {
  className?: string;
};

const Searchbar = ({ className }: SearchbarType) => {
  return (
    <form>
      <div className="relative">
        <input
          type="text"
          className={twMerge(
            `m-2 rounded-full bg-slate-800 px-2 text-white py-2`,
            className
          )}
          placeholder="Search for anything"
        />
      </div>
    </form>
  );
};

export default Searchbar;
