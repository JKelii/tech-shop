"use client";
import { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

import { Skeleton } from "../ui/skeleton";
import { BasketHeader } from "./basketHeader";
import { NavItems } from "./Header";
import { Logo } from "./logo";
import { NavbarItem } from "./NavbarItem";

const Searchbar = lazy(() =>
  import("./Searchbar/Searchbar").then((module) => ({
    default: module.Searchbar,
  })),
);

export const DesktopNavbar = () => {
  const { ref: searchbarRef, inView: searchbarView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="hidden w-full border-separate border-b bg-background shadow-md lg:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] w-full items-center gap-x-2 md:gap-x-4">
          <Logo />
          <div ref={searchbarRef} className="ml-10 w-full justify-self-center">
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
        </div>
        <div className="flex w-full items-center justify-center">
          {NavItems.map((item, index) => (
            <NavbarItem
              key={index}
              label={item.label}
              link={item.link}
              icon={item.icon}
            />
          ))}
          <BasketHeader styles="mt-1" aria-label="Basket" />
        </div>
      </nav>
    </div>
  );
};
