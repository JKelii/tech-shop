import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllProducts } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export const CarouselSize = async () => {
  const { products } = await getAllProducts();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-lg md:max-w-xl lg:max-w-5xl xl:max-w-6xl"
    >
      <CarouselContent>
        {products.slice(0, 6).map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-2">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-8">
                  <Link
                    href={`/item/${products[index].slug}`}
                    className="flex justify-center items-center flex-col"
                  >
                    {product.images && product.images[0] ? (
                      <Image
                        width={250}
                        height={250}
                        alt={product.name}
                        src={product.images[0].url}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span>No Image Available</span>
                      </div>
                    )}
                    <p className=" font-semibold mt-2 text-lg">
                      {product.name}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
