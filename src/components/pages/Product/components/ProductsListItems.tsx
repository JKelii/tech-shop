import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type currentItemsType = {
  description: string;
  id: string;
  name: string;
  price: number;
  slug: string;
  categories: Array<{
    name: string;
  }>;
  images: Array<{
    fileName: string;
    url: string;
    productImages: Array<{
      id: string;
      reviews: Array<{
        content: string;
        rating?: number | null;
      }>;
    }>;
  }>;
}[];

export const ProductsListItems = ({
  currentItems,
}: {
  currentItems: currentItemsType;
}) => {
  return (
    <>
      {currentItems.map((product) => (
        <Link
          href={`/item/${product.slug}`}
          key={product.id}
          className="bg-white/60 shadow-md hover:translate-y-[-3px] transition rounded-md"
        >
          <span className="w-full h-full ">
            <article className="border-[1px] border-gray-500  hover:border-slate-700 size-80 rounded-md gap-2 flex justify-center items-center flex-col transition">
              <Image
                src={product.images[0]?.url}
                alt={product.name}
                width={150}
                height={150}
                className=" min-h-[120px] min-w-[120px] w-auto h-auto"
              />
              <p className="font-semibold self-start ml-4">{product.name}</p>
              <p className="text-sm self-start ml-4 text-muted-foreground">
                {product.description}
              </p>
              <p className="font-bold self-start ml-4">
                {priceUpdate(product.price)}
              </p>
            </article>
          </span>
        </Link>
      ))}
    </>
  );
};
