"use client";
import AddToCartButton from "@/components/addToCartButton";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import SelectQuantity from "./components/SelectQuantity";
import { WishList } from "@/components/WishList";
import { SizeRadioGroup } from "./components/SizeRadioGroup";
import Comments from "./components/Comments";
import { useState } from "react";
import useShopContext from "@/hooks/useShopContext";

type ProductType = {
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
  slug,
}: {
  product: ProductType;
  slug: string;
}) => {
  const { quantity, setQuantity } = useShopContext();

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <div className="flex flex-col md:flex-row justify-center items-start gap-10  p-8 rounded-md">
        {product ? (
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            width={450}
            height={150}
            quality={100}
            className="border-2 border-gray-300 rounded-md"
          />
        ) : (
          <Image
            src=""
            alt="product"
            width={450}
            height={150}
            quality={100}
            className="border-2 border-gray-300 rounded-md h-96"
          />
        )}

        <article className=" flex flex-col items-start justify-center gap-6">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-3xl self-start">{product.name}</p>
            <p className="self-start text-black font-bold text-3xl">
              {priceUpdate(product.price)}
            </p>
          </div>
          <p className="self-start">{product?.description}</p>

          <SizeRadioGroup />
          <SelectQuantity quantity={quantity} setQuantity={setQuantity} />
          <div className="flex justify-center items-center gap-4">
            <AddToCartButton
              quantity={quantity}
              slug={product.slug}
              name={product.name}
              image={product.images[0]?.url}
              price={product.price}
            />
            <WishList />
          </div>
        </article>
      </div>
      <Comments reviews={product.reviews} slug={slug} />
    </div>
  );
};
