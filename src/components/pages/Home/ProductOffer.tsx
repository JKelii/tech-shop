import { getAllProducts } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductOffer = async ({ index }: { index: number }) => {
  const { products } = await getAllProducts();
  return (
    <main className="flex justify-center items-center w-full">
      <Link href={`/item/${products[index].slug}`} key={products[index].id}>
        <span className="w-full h-full">
          <article className="border-2 border-gray-500 shadow-md hover:border-gray-700 w-80 h-96 sm:size-72 lg:size-80 rounded-md flex justify-center items-center flex-col  hover:translate-y-[-2px] transition px-2">
            <Image
              src={products[index].images[0].url}
              alt={products[index].name}
              width={175}
              height={175}
            />
            <p className="font-semibold text-lg self-start ml-4">
              {products[1].name}
            </p>
            <p className="self-start ml-4 text-sm">
              {products[index].description}
            </p>
            <p className="font-bold text-xl pl-4 self-start">
              {" "}
              {priceUpdate(products[index].price)}
            </p>
          </article>
        </span>
      </Link>
    </main>
  );
};

export default ProductOffer;
