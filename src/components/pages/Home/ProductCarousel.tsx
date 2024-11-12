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
import { priceUpdate } from "@/utils/priceUpdate";
import { Separator } from "@/components/ui/separator";

export const ProductCarousel = async () => {
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
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 w-full"
          >
            <div className="w-full">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center  w-full">
                  <Link
                    href={`/item/${products[index].slug}`}
                    className="flex justify-center items-center flex-col w-full"
                  >
                    {product.images && product.images[0] ? (
                      <Image
                        width={300}
                        height={300}
                        alt={product.name}
                        src={product.images[0].url}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span>No Image Available</span>
                      </div>
                    )}
                    <Separator className="h-[1px] w-full" />
                    <div className=" flex flex-col justify-center items-center p-4 w-full bg-white rounded-b-md ">
                      <h2 className="text-xl font-bold">{product.name}</h2>
                      <p className="font-bold text-lg text-black">
                        {priceUpdate(product.price)}
                      </p>
                    </div>
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
