import Image from "next/image";
import Link from "next/link";
import React from "react";

import { priceUpdate } from "@/utils/priceUpdate";

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
          className="w-full rounded-md bg-white/60 shadow-md transition"
        >
          <span className="size-full ">
            <article className="flex size-80 w-full  flex-col items-center justify-center gap-2 rounded-md border border-gray-400 transition hover:border-slate-700">
              <Image
                src={product.images[0]?.url}
                alt={product.name}
                width={150}
                height={150}
                className=" mt-2 size-auto min-h-[120px] min-w-[120px] rounded-lg"
              />
              <p className="ml-4 self-start font-semibold">{product.name}</p>
              <p className="ml-4 self-start text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="ml-4 self-start font-bold">
                {priceUpdate(product.price)}
              </p>
            </article>
          </span>
        </Link>
      ))}
    </>
  );
};
