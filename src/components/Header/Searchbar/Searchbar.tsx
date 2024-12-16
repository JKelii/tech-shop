"use client";
import { algoliasearch } from "algoliasearch";
import { Search } from "lucide-react";
import { Configure, InstantSearch } from "react-instantsearch";

import { CustomSearchBox } from "./CustomSearchBox";
import { HitsScrollArea } from "./HitsScrollArea";
import { useSetIsOpen } from "./hooks/useSetIsOpen";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { getEnv } from "@/utils";

const algoliaId = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
const algoliaKey = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

export const Searchbar = () => {
  const client = algoliasearch(algoliaId, algoliaKey);
  const { isOpen, setIsOpen } = useSetIsOpen();

  return (
    <InstantSearch searchClient={client} indexName="products">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-9 w-64 justify-start rounded-md pl-10 pr-12 text-left lg:w-72 xl:w-96"
          >
            <Search className="mr-2 size-4" />
            <span>Search items...</span>
          </Button>
        </DialogTrigger>
        <Configure />
        <DialogContent
          className="flex min-h-96 w-96 flex-col items-start justify-start  overflow-hidden lg:w-[32rem]"
          aria-describedby={undefined}
        >
          <DialogTitle className=" ">Search Items</DialogTitle>
          <Configure hitsPerPage={4} index="products" distinct={true} />
          <div className="w-full">
            <CustomSearchBox />
          </div>
          <Separator className="h-[0.3px] rounded-lg" />
          <HitsScrollArea setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </InstantSearch>
  );
};
