"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Configure, InstantSearch, useHits } from "react-instantsearch";
import { CustomSearchBox } from "./CustomSearchBox";
import { algoliasearch } from "algoliasearch";
import { getEnv } from "@/utils";
import { HitsScrollArea } from "./HitsScrollArea";

//TODO: add moving with key 3.fix searchbar
const algoliaId = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
const algoliaKey = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

export const Searchbar = () => {
  const client = algoliasearch(algoliaId, algoliaKey);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <InstantSearch searchClient={client} indexName="products">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-64 lg:w-72 xl:w-96 h-9 pl-10 pr-12 rounded-md justify-start text-left  "
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search items...</span>
          </Button>
        </DialogTrigger>
        <Configure />
        <DialogContent
          className="flex min-h-96 w-96 lg:w-[32rem] flex-col items-start  justify-start overflow-hidden"
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
