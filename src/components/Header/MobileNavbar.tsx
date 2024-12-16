"use client";

import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { lazy, Suspense, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { NavItems } from "./Header";
import { Logo } from "./logo";
import { NavbarItem } from "./NavbarItem";

const Searchbar = lazy(() =>
  import("./Searchbar/Searchbar").then((module) => ({
    default: module.Searchbar,
  })),
);

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref: searchbarRef, inView: searchbarView } = useInView({
    triggerOnce: true,
  });
  return (
    <div className="block w-full min-w-[380px] border-separate bg-background lg:hidden">
      <nav
        className="container flex items-center justify-between px-8 "
        role="navigation"
        aria-label="Pagination Navigation"
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            aria-describedby={undefined}
            className="flex w-[400px] flex-col items-center justify-start sm:w-[540px]"
            side="left"
            onClick={() => setIsOpen(false)}
          >
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-start justify-center pt-4">
              {NavItems.map((item) => (
                <NavbarItem
                  icon={item.icon}
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  setIsOpen={setIsOpen}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div
          ref={searchbarRef}
          className="flex w-full items-center justify-center"
        >
          {searchbarView && (
            <Suspense
              fallback={
                <Skeleton className="h-9 w-64 justify-start rounded-md pl-10 pr-12 text-left lg:w-72 xl:w-96" />
              }
            >
              <Searchbar />
            </Suspense>
          )}
        </div>

        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <div className="flex items-center gap-2">
            <Link href="/basket">
              <Button variant={"ghost"} size={"icon"}>
                <ShoppingCart />
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <Separator className="h-[2px] w-full bg-gray-400" />
    </div>
  );
};
