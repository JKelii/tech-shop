"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

//TODO: setup algolia.com
//https://dashboard.algolia.com/apps/1GIP6TQ1KL/launchpad/import-data
//https://www.algolia.com/doc/guides/building-search-ui/installation/react/

export const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
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
      <DialogContent
        className="flex min-h-96 w-96 lg:w-[32rem] flex-col items-start  justify-start overflow-hidden"
        aria-describedby={undefined}
      >
        <DialogTitle className=" ">Search Items</DialogTitle>
        <div className="w-full">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full h-10 px-4 rounded-md "
          />
        </div>
        <Separator className="h-[0.3px] rounded-lg" />
        <ScrollArea className="h-[250px] rounded-md border p-4 w-full">
          <div className=" flex flex-col gap-4 justify-start items-start">
            <article className="flex justify-start items-center gap-4 ">
              <div className="size-10 bg-gray-400 rounded-lg"></div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Hej</h3>
                <p className="text-sm text-muted-foreground">4.50</p>
              </div>
            </article>
            <article className="flex justify-start items-center gap-4 ">
              <div className="size-10 bg-gray-400 rounded-lg"></div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Hej</h3>
                <p className="text-sm text-muted-foreground">4.50</p>
              </div>
            </article>
            <article className="flex justify-start items-center gap-4 ">
              <div className="size-10 bg-gray-400 rounded-lg"></div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Hej</h3>
                <p className="text-sm text-muted-foreground">4.50</p>
              </div>
            </article>
            <article className="flex justify-start items-center gap-4 ">
              <div className="size-10 bg-gray-400 rounded-lg"></div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Hej</h3>
                <p className="text-sm text-muted-foreground">4.50</p>
              </div>
            </article>
            <article className="flex justify-start items-center gap-4 ">
              <div className="size-10 bg-gray-400 rounded-lg"></div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Hej</h3>
                <p className="text-sm text-muted-foreground">4.50</p>
              </div>
            </article>
            <article className="flex justify-start items-center gap-4 ">
              <div className="size-10 bg-gray-400 rounded-lg"></div>
              <div className="flex flex-col">
                <h3 className="font-semibold">Hej</h3>
                <p className="text-sm text-muted-foreground">4.50</p>
              </div>
            </article>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
