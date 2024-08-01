"use client";
import { usePathname } from "next/navigation";
import Logo, { MobileLogo } from "./logo";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Searchbar from "./searchbar";
import BasketHeader from "./basketHeader";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

const Headers = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const items = [
  { label: "Favorites", link: "/favorites" },
  { label: "Contact", link: "/contact" },
  { label: "Account", link: "/login" },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block border-separate bg-background md:hidden w-full">
      <nav className="container flex items-center justify-between px-8 ">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu className="text-gray-400" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <MobileLogo />
            <div className="flex flex-col pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <div className="flex items-center gap-2">
            <BasketHeader />
          </div>
        </div>
      </nav>
      <div className="bg-gray-400 w-full h-[2px] mt-2" />
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block w-full rounded-b-lg shadow-md">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-2 md:gap-x-4">
          <Logo />
          <div className="flex full">
            {items.map((item, index) => (
              <NavbarItem key={index} label={item.label} link={item.link} />
            ))}
          </div>
          <Searchbar />
        </div>
        <BasketHeader />
      </nav>
    </div>
  );
};

export default Headers;

const NavbarItem = ({
  label,
  link,
  clickCallback,
}: {
  label: string;
  link: string;
  clickCallback?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start  md:text-sm text-lg lg:text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[20px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
      )}
    </div>
  );
};
