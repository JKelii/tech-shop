"use client";
import Link from "next/link";
import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { priceUpdate } from "@/utils/priceUpdate";

const ProductOfferLazyImage = lazy(() =>
  import("./ProductOfferLazyImage").then((module) => ({
    default: module.ProductOfferLazyImage,
  })),
);

type ProductOfferDisplayType = {
  description: string;
  id: string;
  name: string;
  price: number;
  slug: string;
  categories: Array<{
    name: string;
  }>;
  size: Array<{
    productVariantSize: Array<{
      name?: string | null;
      productQuantity: Array<number>;
    }>;
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

const ProductOfferDisplay = ({
  index,
  products,
}: {
  index: number;
  products: ProductOfferDisplayType;
}) => {
  const { ref: lazyImageRef, inView: lazyImageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <main className="flex w-full items-center justify-center  ">
      <Link href={`/item/${products[index].slug}`} key={products[index].id}>
        <span className="size-full">
          <Card className="flex size-80 flex-col flex-wrap items-center justify-center rounded-md border border-gray-400 shadow-md transition  hover:border-gray-700">
            <CardContent className="" ref={lazyImageRef}>
              {lazyImageInView && (
                <Suspense
                  fallback={
                    <>
                      <Skeleton className="size-[175px]" />
                    </>
                  }
                >
                  <ProductOfferLazyImage
                    src={products[index].images[0].url}
                    alt={products[index].name}
                    index={index}
                  />
                </Suspense>
              )}
            </CardContent>
            <p className="ml-4 self-start rounded-lg text-lg font-semibold">
              {products[index].name}
            </p>
            <p className="ml-4 self-start text-sm text-muted-foreground">
              {products[index].description}
            </p>
            <p className="self-start pl-4 text-xl font-bold">
              {" "}
              {priceUpdate(products[index].price)}
            </p>
          </Card>
        </span>
      </Link>
    </main>
  );
};

export default ProductOfferDisplay;
