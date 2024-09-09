"use client";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Comments from "./components/Comments";

import { ProductManagement } from "./components/ProductManagement";
import { Metadata, ResolvingMetadata } from "next";
import { getProductSlug } from "@/lib";

export type ProductType = {
  description: string;
  id: string;
  name: string;
  price: number;
  slug: string;
  reviews: {
    content: string;
    name: string;
  }[];
  images: {
    fileName: string;
    url: string;
  }[];
};

export const ProductPage = ({
  product,

  favoriteId,
}: {
  product: ProductType;
  slug: string;
  favoriteId: string | undefined;
}) => {
  return (
    <div className="flex flex-col justify-start shadow-md container mx-auto items-center min-h-screen bg-gray-100/50 border-2 border-gray-200 mt-10 rounded-lg mb-10">
      <div className="flex flex-col md:flex-row justify-center items-start gap-10  p-8 rounded-md">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          width={450}
          height={150}
          quality={100}
          className="border-2 border-gray-300 rounded-md h-96"
        />
        <article className=" flex flex-col items-start justify-center gap-6">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-3xl self-start">{product.name}</p>
            <p className="self-start text-black font-bold text-3xl">
              {priceUpdate(product.price)}
            </p>
          </div>
          <p className="self-start">{product?.description}</p>
          {/* //TODO: Add If item doesnt have size radio group won't show */}

          <ProductManagement favoriteId={favoriteId} product={product} />
        </article>
      </div>
      <Comments reviews={product.reviews} slug={product.slug} />
    </div>
  );
};
