"use client";
import Image from "next/image";

import Comments from "./Comments";
import { LastSeenItems } from "./LastSeenItems";
import { ProductManagement } from "./ProductManagement";

import { Separator } from "@/components/ui/separator";

import { priceUpdate } from "@/utils/priceUpdate";

import type { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";

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
  return (
    <div className="container mx-auto my-10 flex min-h-screen min-w-[350px] flex-col items-center justify-start rounded-lg border-2 border-gray-200 bg-gray-100/50 shadow-md">
      <div className="flex w-full min-w-[350px] flex-col items-start justify-center gap-14 rounded-md p-8 md:flex-row">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          width={450}
          height={150}
          quality={100}
          priority
          className="aspect-auto rounded-md border border-gray-300"
        />
        <article className="mr-4 flex flex-col w-1/3 items-start justify-between gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
            <p className="self-start text-3xl font-bold">{product.name}</p>
            <p className="self-start text-3xl font-bold text-black mr-2">
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

        <Comments reviews={product.reviews} slug={product.slug} />
      </div>
    </div>
  );
};

export default ProductPage;
