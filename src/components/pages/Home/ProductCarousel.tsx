import { ProductCarouselContent } from "./ProductCarouselContent";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getAllProducts } from "@/lib";

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
      <CarouselPrevious className="p-0" />
      <CarouselNext className="p-0" />
    </Carousel>
  );
};
