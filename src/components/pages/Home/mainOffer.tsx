import { getAllProducts } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const MainOffer = async () => {
  const { products } = await getAllProducts();
  return (
    <div className="flex justify-center items-center gap-8 lg:gap-24 z-10 border-2 border-gray-500   rounded-md p-4">
      <a href={`item/${products[2].slug}`}>
        <div className="flex justify-center items-center gap-2 md:gap-8 lg:gap-24 cursor-pointer">
          <div className="flex justify-center items-center flex-col gap-4">
            <h2 className="font-bold text-sm lg:text-2xl text-gray-800">
              Elevate Your Tech Experience
            </h2>
            <p className="text-sm lg:text-xl text-gray-600">
              Discover the latest and greatest tech products to enhance your
              digital lifestyle.
            </p>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-sm lg:text-2xl">Only for </p>
              <p className="font-bold text-sm lg:text-2xl">
                {priceUpdate(products[2].price)}
              </p>
            </div>
          </div>
          <Image
            src={products[2].images[0].url}
            alt={products[2].name}
            width={300}
            height={300}
            priority
            className="size-28 md:size-44 lg:size-80 "
          />
        </div>
      </a>
    </div>
  );
};

export default MainOffer;
