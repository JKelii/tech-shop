"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { priceUpdate } from "@/utils/priceUpdate";
import Link from "next/link";
import React, { lazy, Suspense } from "react";

import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import index from "@/app/pages";

const ProductCarouselImage = lazy(() =>
  import("./ProductCarouselImage").then((module) => ({
    default: module.ProductCarouselImage,
  }))
);

type ProductCarouselContentType = {
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

export const ProductCarouselContent = ({
  products,
}: {
  products: ProductCarouselContentType;
}) => {
  return (
    <>
      {products.slice(0, 7).map((product, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 w-full">
          <div className="w-full">
            <Card>
              <CardContent className="flex flex-col aspect-square items-center justify-center  w-full">
                <Link
                  href={`/item/${products[index].slug}`}
                  className="flex justify-center items-center  flex-col "
                >
                  <ProductCarouselImage
                    src={product.images[0].url}
                    alt={product.name}
                  />

                  <Separator className="h-[1px] w-full" />
                  <div className=" flex flex-col justify-center items-center p-4 w-full bg-white rounded-b-md ">
                    <h2 className="md:text-md lg:text-xl font-bold">
                      {product.name}
                    </h2>
                    <p className="font-bold  text-lg text-black">
                      {priceUpdate(product.price)}
                    </p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </>
  );
};
