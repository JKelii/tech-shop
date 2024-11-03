"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { Logo } from "./logo";
import { NavItems } from "./Headers";
import { NavbarItem } from "./NavbarItem";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Searchbar from "./searchbar";

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background lg:hidden w-full min-w-[380px]">
      <nav
        className="container flex items-center justify-between px-8 "
        role="navigation"
        aria-label="Pagination Navigation"
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu className="text-gray-400" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] flex justify-start items-center flex-col "
            side="left"
            onClick={() => setIsOpen(false)}
          >
            <Logo />
            <div className="flex flex-col items-center justify-center pt-4">
              {NavItems.map((item) => (
                <NavbarItem
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  setIsOpen={setIsOpen}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <div className="flex items-center gap-2">
            <Link href="/basket">
              <ShoppingCart className="text-gray-400" />
            </Link>
          </div>
        </div>
      </nav>
      <Separator className="bg-gray-400 h-[2px] w-full" />
    </div>
  );
};
