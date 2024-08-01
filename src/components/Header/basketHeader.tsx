"use client";

import useShopContext from "@/hooks/useShopContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const BasketHeader = () => {
  const { cart } = useShopContext();
  return (
    <Link href="/basket">
      <div className="flex  flex-col shadow-md border-gray-400 duration-300 justify-center hover:text-gray-500 text-gray-400 items-center lg:hover:-translate-y-1 border-2 p-3 rounded-lg">
        <div className="flex justify-center items-center  mb-1">
          <span>
            <ShoppingCart className=" size-8  p-0 m-0 " />
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
