import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <section>
      <Link
        href="/"
        className={cn(
          "flex text-sm justify-center items-center gap-1 font-bold text-md text-black transition lg:hover:-translate-y-[0.8px] p-1 rounded-lg ",
        )}
      >
        <ShoppingBasketIcon className="size-7 " />
        TechShop
      </Link>
    </section>
  );
};
