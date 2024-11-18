import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllProducts } from "@/lib";
import { ProductCarouselContent } from "./ProductCarouselContent";

//TODO: Lazy loading on images

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
        <ProductCarouselContent products={products} />
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
