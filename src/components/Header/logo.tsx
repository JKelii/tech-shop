import { cn } from "@/lib/utils";
import { ShoppingBasketIcon } from "lucide-react";

export const Logo = () => {
  return (
    <main>
      <a
        href="/"
        className={cn(
          "flex text-sm justify-center items-center gap-1 font-bold text-md text-gray-500 hover:text-gray-600 transition lg:hover:-translate-y-1 p-1 rounded-lg  "
        )}
      >
        <ShoppingBasketIcon className="w-7 h-7 " />
        TechShop
      </a>
    </main>
  );
};
