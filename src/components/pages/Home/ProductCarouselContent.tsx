"use client";
import Link from "next/link";
import React, { lazy } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

import { priceUpdate } from "@/utils/priceUpdate";

const ProductCarouselImage = lazy(() =>
  import("./ProductCarouselImage").then((module) => ({
    default: module.ProductCarouselImage,
  })),
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
        <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
          <div className="w-full">
            <Card>
              <CardContent className="flex aspect-square w-full flex-col items-center  justify-center">
                <Link
                  href={`/item/${products[index].slug}`}
                  className="flex flex-col items-center  justify-center "
                >
                  <ProductCarouselImage
                    src={product.images[0].url}
                    alt={product.name}
                  />

                  <Separator className="h-px w-full" />
                  <div className=" flex w-full flex-col items-center justify-center rounded-b-md bg-white p-4 ">
                    <h2 className="md:text-md font-bold lg:text-xl">
                      {product.name}
                    </h2>
                    <p className="text-lg  font-bold text-black">
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
