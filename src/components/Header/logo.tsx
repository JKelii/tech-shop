import { ShoppingBasketIcon } from "lucide-react";

const Logo = () => {
  return (
    <main>
      <a
        href="/"
        className="flex flex-col  justify-center items-center gap-1 font-bold text-md text-white hover:text-gray-200 transition ps-1 lg:ps-4 hover:-translate-y-1"
      >
        <ShoppingBasketIcon className="w-8 h-8" />
        TechShop
      </a>
    </main>
  );
};

export default Logo;
