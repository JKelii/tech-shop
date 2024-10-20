"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";

export const NavbarItem = ({
  label,
  link,
  icon,
  setIsOpen,
}: {
  label: string;
  link: string;
  icon?: ReactNode;
  handleItemClick?: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === link || (label === "Account" && pathname === "/account");

  return (
    <ul className="relative flex items-center justify-center">
      <Link
        href={label === "Account" ? "/account" : link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start flex-col lg:flex-row text-sm xl:text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => setIsOpen(false)}
      >
        {icon && <span className="mr-2 size-5 ">{icon}</span>}

        {label === "Account" ? "Account" : label}
      </Link>

      {isActive && (
        <li
          aria-label="Active page"
          className="absolute -bottom-[20px] left-1/2 hidden h-[2px] w-[85%] -translate-x-1/2 rounded-xl bg-foreground lg:block"
        ></li>
      )}
    </ul>
  );
};
