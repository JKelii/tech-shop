import { cn } from "@/lib/utils";
import { ShoppingBasketIcon } from "lucide-react";

const Logo = () => {
  return (
    <main>
      <a
        href="/"
        className={cn(
          "flex flex-col text-sm justify-center items-center gap-1 font-bold text-md text-gray-400 hover:text-gray-500 transition border-2 border-gray-400  lg:hover:-translate-y-1 p-1 rounded-lg shadow-md "
        )}
      >
        <ShoppingBasketIcon className="w-7 h-7 " />
        TechShop
      </a>
    </main>
  );
};

export const MobileLogo = () => {
  return (
    <main>
      <a
        href="/"
        className={cn(
          "flex flex-col text-sm justify-center items-center gap-1 ml-3 w-[100px] font-bold text-md text-gray-400 hover:text-gray-500 transition border-2 border-gray-400  lg:hover:-translate-y-1 p-1 rounded-lg shadow-md "
        )}
      >
        <ShoppingBasketIcon className="w-7 h-7 " />
        TechShop
      </a>
    </main>
  );
};

export default Logo;
