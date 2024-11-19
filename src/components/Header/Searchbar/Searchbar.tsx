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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Configure, Hits, InstantSearch } from "react-instantsearch";
import { Hit } from "./Hit";
import { getAllProducts } from "@/lib";
import { CustomSearchBox } from "./CustomSearchBox";
import { algoliasearch } from "algoliasearch";
import { getEnv } from "@/utils";

//TODO: 1.fix envs 2. fix 2 same items in search 3.fix searchbar

const algoliaId = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
const algoliaKey = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

export const Searchbar = () => {
  const client = algoliasearch(algoliaId, algoliaKey);

  const processRecords = async () => {
    try {
      const products = (await getAllProducts()).products;
      return await client.saveObjects({
        indexName: "products",
        objects: products.map((product) => ({
          objectID: product.id,
          categories: product.categories,
          name: product.name,
          slug: product.slug,
          images: product.images[0].url,
          price: product.price,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <InstantSearch searchClient={client} indexName="products">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-64 lg:w-72 xl:w-96 h-9 pl-10 pr-12 rounded-md justify-start text-left font-normal"
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
          <Configure hitsPerPage={25} index="products" distinct={true} />
          <div className="w-full">
            <CustomSearchBox />
          </div>
          <Separator className="h-[0.3px] rounded-lg" />
          <ScrollArea className="h-[250px] rounded-md border p-4 w-96 lg:w-full">
            <div
              className=" flex flex-col gap-4 justify-start items-start"
              onClick={() => setIsOpen(false)}
            >
              <Hits hitComponent={Hit} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </InstantSearch>
  );
};
