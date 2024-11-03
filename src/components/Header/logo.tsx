import { cn } from "@/lib/utils";
import { ShoppingBasketIcon } from "lucide-react";

export const Logo = () => {
  return (
    <main>
      <a
        href="/"
        className={cn(
          "flex text-sm justify-center items-center gap-1 font-bold text-md text-black hover:text-black/80 transition lg:hover:-translate-y-[0.8px] p-1 rounded-lg  "
        )}
      >
        <ShoppingBasketIcon className="w-7 h-7 " />
        TechShop
      </a>
    </main>
  );
};
