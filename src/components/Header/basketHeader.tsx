"use client";

import useShopContext from "@/hooks/useShopContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const BasketHeader = () => {
  const { basket } = useShopContext();
  return (
    <div className="flex hover:-translate-y-1 transition justify-center items-center">
      <Link href="/basket">
        <span>
          <ShoppingCart
            width={30}
            height={30}
            className="text-white hover:text-gray-200 transition p-0 m-0 w-12"
          />
        </span>
      </Link>
      <p className="text-white font-bold text-2xl self-center m-0">
        {basket.length >= 1 && basket.length}
      </p>
    </div>
  );
};

export default BasketHeader;
