import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

type SearchbarType = {
  className?: string;
};

//TODO: setup algolia.com
//https://dashboard.algolia.com/apps/1GIP6TQ1KL/launchpad/import-data
//https://www.algolia.com/doc/guides/building-search-ui/installation/react/

const Searchbar = ({ className }: SearchbarType) => {
  return (
    <form>
      <div className="relative flex-1 max-w-md mx-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-[16px] h-[16px] text-muted-foreground" />
        </div>

        <Input
          type="search"
          placeholder="Search products..."
          className="w-48 lg:w-80 xl:w-96 h-9 pl-10 pr-12 rounded-md bg-muted focus:ring-primary focus:border-primary"
        />
      </div>
    </form>
  );
};

export default Searchbar;
