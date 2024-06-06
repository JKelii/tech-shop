import { getAllProducts } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const MainOffer = async () => {
  const { products } = await getAllProducts();
  return (
    <div className="flex justify-center items-center gap-24 z-10 border-2 border-zinc-500 hover:border-gray-700 rounded-md">
      <a href={`item/${products[2].slug}`}>
        <div className="flex justify-center items-center gap-24 cursor-pointer">
          <div className="flex justify-center items-center flex-col gap-2">
            <h2 className="font-bold text-4xl text-gray-800">
              CHECK OUR LATEST DEAL
            </h2>
            <p className="text-lg text-gray-600">Zip hoodie with our logo</p>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl">Only for </p>
              <p className="font-bold text-2xl">
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
            className="mx-2"
          />
        </div>
      </a>
    </div>
  );
};

export default MainOffer;
