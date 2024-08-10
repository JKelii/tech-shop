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
  clickCallback,
  icon,
}: {
  label: string;
  link: string;
  clickCallback?: () => void;
  icon?: ReactNode;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === link || (label === "Account" && pathname === "/account");
  const { data: session } = useSession();

  return (
    <div className="relative flex items-center justify-center">
      <Link
        href={session && label === "Account" ? "/account" : link}
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

        {session && label === "Account" ? session.user?.email : label}
      </Link>

      {isActive && (
        <div className="absolute -bottom-[20px] left-1/2 hidden h-[2px] w-[85%] -translate-x-1/2 rounded-xl bg-foreground lg:block"></div>
      )}
    </div>
  );
};
