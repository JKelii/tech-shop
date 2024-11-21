"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";

export const NavbarItem = ({
  label,
  link,
  icon,
}: {
  label: string;
  link: string;
  icon?: ReactNode;
  handleItemClick?: () => void;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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
          "w-full text-md xl:text-lg text-black hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        <div className="justify-center items-center flex gap-2 ">
          <span className="size-30">{icon}</span>
          <p> {label === "Account" ? "Account" : label}</p>
        </div>
      </Link>
      {isActive && (
        <li
          aria-label="Active page"
          className="absolute -bottom-[20px] left-1/2 hidden h-[2px] w-[85%] -translate-x-1/2 rounded-xl bg-black lg:block"
        ></li>
      )}
    </ul>
  );
};
