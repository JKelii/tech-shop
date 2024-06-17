"use client";
import { getProductSlug } from "@/lib";
import React, { useState } from "react";
import Image from "next/image";
import { priceUpdate } from "@/utils/priceUpdate";
import useShopContext from "@/hooks/useShopContext";
import { X } from "lucide-react";
import { Product } from "@/lib/hygraph/generated/graphql";

const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { basket, setBasket } = useShopContext();
  const [product, setProduct] = useState<Product | null>(null);

  //TODO: fix type errors

  const fetchProduct = async () => {
    const data = await getProductSlug({ slug });
    setProduct(data.product);
  };

  fetchProduct();

  const removeFromBasket = (productToRemove: Product) => {
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

  const totalPrice = basket.reduce(
    (total: number, product) =>
      total + Number(product.price) * Number(product.quantity),
    0
  );

  return (
    <main className="flex flex-col justify-center items-center mt-10 mb-10 min-h-screen">
      <a
        href="/basket/checkout"
        className="w-32 text-center border-2 border-black rounded-md m-6"
      >
        Go to checkout
      </a>
      <p className="font-bold text-3xl">
        Total price: {priceUpdate(totalPrice)}
      </p>
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
          <p>{product.quantity}</p>
          <div className="flex flex-col">
            <p className="font-bold text-lg">{product?.name}</p>
            <p className=" text-black text-xl">
              {priceUpdate(product?.price * product.quantity)}
            </p>
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
