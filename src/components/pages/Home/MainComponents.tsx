import { ProductCarousel } from "./ProductCarousel";
import { ProductOfferList } from "./ProductOfferList";

export const MainComponents = () => {
  return (
    <div className="my-6 w-full flex justify-center items-center flex-col">
      <ProductCarousel />
      <div className="flex justify-between w-full font-bold text-xl my-6 rounded-lg">
        <h3 className="text-3xl font-bold">Featured Products</h3>
        <a
          href="/items"
          className="border-2 border-gray-200 p-1 rounded-md shadow-md hover:translate-y-[2px] transition"
        >
          View all items
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-16">
        <ProductOfferList />
      </div>
    </div>
  );
};
