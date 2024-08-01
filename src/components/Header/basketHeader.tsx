"use client";

import useShopContext from "@/hooks/useShopContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const BasketHeader = () => {
  const { cart } = useShopContext();
  return (
    <Link href="/basket">
      <div className="flex ml-1 flex-col duration-300 justify-center hover:text-gray-500 text-gray-400 items-center lg:hover:-translate-y-1 rounded-lg">
        <div className="flex justify-center items-center mt-1">
          <span>
            <ShoppingCart className=" size-6  p-0 " />
          </span>
          <p className=" text-2xl  font-bold ml-2 self-center">
            {cart?.length}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BasketHeader;
