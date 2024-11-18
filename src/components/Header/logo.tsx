import { cn } from "@/lib/utils";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <section>
      <Link
        href="/"
        className={cn(
          "flex text-sm justify-center items-center gap-1 font-bold text-md text-black transition lg:hover:-translate-y-[0.8px] p-1 rounded-lg "
        )}
      >
        <ShoppingBasketIcon className="w-7 h-7 " />
        TechShop
      </Link>
    </section>
  );
};
