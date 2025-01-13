import Link from "next/link";

import { ProductCarousel } from "./ProductCarousel";
import { ProductOfferList } from "./ProductOfferList";

export const MainComponents = () => {
  return (
    <div className="my-6 flex w-full flex-col items-center justify-center">
      <ProductCarousel />
      <div className="my-6 flex w-full justify-between rounded-lg text-xl font-bold">
        <h3 className="text-3xl font-bold">Featured Products</h3>
        <Link
          href="/items"
          className="sm:text-md rounded-md border-2 border-gray-200 p-1 text-center text-sm shadow-md transition hover:translate-y-[2px] md:text-lg"
        >
          View all items
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-16">
        <ProductOfferList />
      </div>
    </div>
  );
};
