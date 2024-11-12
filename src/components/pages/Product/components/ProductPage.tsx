"use client";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";
import { ProductManagement } from "./ProductManagement";
import { LastSeenItems } from "./LastSeenItems";
import { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

const Comments = lazy(() => import("./Comments"));

export type ProductType = {
  description: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  size: Array<{
    productVariantSize: Array<{
      name?: string | null;
      productQuantity: Array<number>;
    }>;
  }>;
  reviews: Array<{
    content: string;
    name: string;
    date: string;
  }>;
  images: Array<{
    fileName: string;
    url: string;
  }>;
};

export const ProductPage = ({
  lastSeenItems,
  product,
  favoriteId,
}: {
  lastSeenItems: GetProductBySlugQuery[] | undefined;
  product: ProductType;
  slug: string;
  favoriteId: string | undefined;
}) => {
  const { ref: commentsRef, inView: commentsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col container mx-auto justify-start shadow-md items-center min-h-screen bg-gray-100/50 border-2 border-gray-200 mt-10 rounded-lg mb-10 min-w-[350px]">
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 w-full p-8 rounded-md min-w-[350px]">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          width={450}
          height={150}
          quality={100}
          priority
          className="border-2 border-gray-300 rounded-md aspect-auto"
        />
        <article className="flex flex-col items-start justify-center gap-6 mr-4">
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center w-full">
            <p className="font-bold text-3xl self-start">{product.name}</p>
            <p className="self-start text-black font-bold text-3xl">
              {priceUpdate(product.price)}
            </p>
          </div>
          <p className="self-start">{product?.description}</p>
          <ProductManagement
            favoriteId={favoriteId}
            product={product}
            productQuantity={product.quantity}
          />
        </article>
      </div>

      <Separator className="h-[2px]" />
      <div className="w-full p-8">
        {lastSeenItems && lastSeenItems.length >= 1 && (
          <LastSeenItems lastSeenItems={lastSeenItems} slug={product.slug} />
        )}
        <div ref={commentsRef} className="w-full">
          {commentsInView && (
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <Comments reviews={product.reviews} slug={product.slug} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
