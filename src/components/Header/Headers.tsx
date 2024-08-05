"use client";
import { usePathname } from "next/navigation";
import Logo, { MobileLogo } from "./logo";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Searchbar from "./searchbar";
import BasketHeader from "./basketHeader";
import { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HeartIcon, Mail, Menu, Package, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { SearchBox } from "react-instantsearch";

const Headers = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const items = [
  { label: "Favorites", link: "/favorites", icon: <HeartIcon /> },
  { label: "Contact", link: "/contact", icon: <Mail /> },
  { label: "Items", link: "/items", icon: <Package /> },
  { label: "Account", link: "/login", icon: <User /> },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block border-separate bg-background md:hidden w-full min-w-[380px]">
      <nav className="container flex items-center justify-between px-8 ">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu className="text-gray-400" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <MobileLogo />
            <div className="flex flex-col items-center justify-center pt-4">
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
      <Separator className="bg-gray-400 h-[2px] w-full" />
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block w-full rounded-b-lg shadow-md">
      <nav className="container flex flex-wrap items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-2 md:gap-x-4">
          <Logo />
        </div>
        <Searchbar />
        <div className="flex full">
          {items.map((item, index) => (
            <NavbarItem
              key={index}
              label={item.label}
              link={item.link}
              icon={item.icon}
            />
          ))}
          <BasketHeader styles="mt-2" />
        </div>
      </nav>
    </div>
  );
};

export default Headers;

const NavbarItem = ({
  label,
  link,
  clickCallback,
  icon,
}: {
  label: string;
  link: string;
  clickCallback?: () => void;
  icon?: ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  const session = useSession();
  return (
    <div className="relative flex items-center justify-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start flex-col lg:flex-row text-sm xl:text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {icon && <span className="mr-2 size-5 ">{icon}</span>}
        {label}
      </Link>

      {isActive && (
        <div className="absolute -bottom-[20px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
      )}
    </div>
  );
};
