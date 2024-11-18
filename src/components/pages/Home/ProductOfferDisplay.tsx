"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { priceUpdate } from "@/utils/priceUpdate";
import Link from "next/link";
import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

const ProductOfferLazyImage = lazy(() =>
  import("./ProductOfferLazyImage").then((module) => ({
    default: module.ProductOfferLazyImage,
  }))
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
    <main className="flex justify-center items-center w-full  ">
      <Link href={`/item/${products[index].slug}`} key={products[index].id}>
        <span className="w-full h-full">
          <Card className="border-[1px] border-gray-400 shadow-md hover:border-gray-700 size-80 rounded-md flex justify-center items-center flex-col flex-wrap  transition">
            <CardContent className="" ref={lazyImageRef}>
              {lazyImageInView && (
                <Suspense
                  fallback={
                    <>
                      <Skeleton className="h-[175px] w-[175px]" />
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
            <p className="font-semibold text-lg self-start ml-4 rounded-lg">
              {products[index].name}
            </p>
            <p className="self-start ml-4 text-sm text-muted-foreground">
              {products[index].description}
            </p>
            <p className="font-bold text-xl pl-4 self-start">
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
