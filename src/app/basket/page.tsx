"use client";
import { getProductSlug } from "@/lib";
import React, { useState } from "react";

import Image from "next/image";
import { priceUpdate } from "@/utils/priceUpdate";
import useShopContext from "@/hooks/useShopContext";
import { X } from "lucide-react";

type ProductType = {
  product: {
    slug: string;
  };
};

const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { basket, setBasket } = useShopContext();
  const [product, setProduct] = useState(null);

  //TODO: 1.https://nextjs.org/docs/app/api-reference/functions/cookies do przeczytania 2.https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  //TODO: 3.https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

  const fetchProduct = async () => {
    const data = await getProductSlug({ slug });
    setProduct(data.product);
  };

  fetchProduct();

  const removeFromBasket = (productToRemove) => {
    setBasket((currentBasket) => {
      const index = currentBasket.findIndex(
        (product) => product.slug === productToRemove.slug
      );

      if (index !== -1) {
        return [
          ...currentBasket.slice(0, index),
          ...currentBasket.slice(index + 1),
        ];
      }
      return currentBasket;
    });
  };

  const total = basket.reduce((total, product) => total + product.price, 0);
  const totalPrice = priceUpdate(total);

  return (
    <main className="flex flex-col justify-center items-center mt-10 mb-10 min-h-screen">
      <p className="font-bold text-3xl">Total price: {totalPrice}</p>
      {basket.map((product) => (
        <div
          key={product.slug}
          className="flex justify-center items-center gap-12 mt-10  p-4"
        >
          <Image
            src={product?.image}
            alt={product?.name}
            width={100}
            height={100}
            quality={100}
            className="border-2 border-gray-500 rounded-md"
          />
          <div className="flex flex-col">
            <p className="font-bold text-lg">{product?.name}</p>
            <p className=" text-black text-xl">{priceUpdate(product?.price)}</p>
          </div>
          <button
            className=" p-2 rounded-sm"
            onClick={() => removeFromBasket(product)}
          >
            <X />
          </button>
        </div>
      ))}
    </main>
  );
};

export default Page;
