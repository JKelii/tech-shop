"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

const ProductCarousel = lazy(() =>
  import("./ProductCarousel").then((module) => ({
    default: module.ProductCarousel,
  }))
);
const ProductOffer = lazy(() => import("./ProductOffer"));

export const LazyMainComponents = () => {
  const { ref: carouselRef, inView: carouselInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: productOffersRef, inView: productOffersInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="my-6 w-full flex justify-center items-center flex-col">
      <div
        ref={carouselRef}
        className="w-full flex justify-center items-center"
      >
        {carouselInView && (
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full gap-4">
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                <Skeleton className="w-full h-[400px]" />
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
              </div>
            }
          >
            <ProductCarousel />
          </Suspense>
        )}
      </div>
      <div ref={productOffersRef} className="w-full">
        {productOffersInView && (
          <>
            <Suspense
              fallback={
                <div className="flex flex-col justify-center items-center w-full h-full mt-20 rounded-lg gap-8">
                  <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-[35px] w-[150px]" />
                    <Skeleton className="h-[35px] w-[120px]" />
                  </div>
                  <Skeleton className="w-full h-[700px]" />
                </div>
              }
            >
              <div className="flex justify-between w-full font-bold text-xl my-6 rounded-lg">
                <h3 className="text-3xl font-bold">Featured Products</h3>
                <a
                  href="/items"
                  className="border-2 border-gray-200 p-1 rounded-md shadow-md hover:translate-y-[2px] transition"
                >
                  View all items
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-16">
                <ProductOffer index={11} />
                <ProductOffer index={8} />
                <ProductOffer index={14} />
                <ProductOffer index={5} />
                <ProductOffer index={7} />
                <ProductOffer index={22} />
              </div>
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
};
