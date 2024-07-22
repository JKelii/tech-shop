"use client";

import React, { useState } from "react";
import Image from "next/image";

import useShopContext from "@/hooks/useShopContext";
import { X } from "lucide-react";

import SelectQuantity from "@/components/pages/Product/components/SelectQuantity";
import { checkCart, getCartFromCookie, removeFromCart } from "@/actions/cart";
import { useSession } from "next-auth/react";

const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { cart, setCart, quantity, setQuantity } = useShopContext();
  const session = useSession();

  const handleDelete = async () => {
    const updatedCart = await removeFromCart({
      product: { slug, quantity },
    });

    if (updatedCart) {
      setCart(updatedCart);
    } else {
      setCart([]);
    }
    setQuantity(0);
  };

  console.log(cart);
  return (
    <main className="flex flex-col justify-center items-center mt-10 mb-10 min-h-screen">
      <a
        href="/basket/checkout"
        className="w-32 text-center border-2 border-black rounded-md m-6"
      >
        Go to checkout
      </a>
      <p className="font-bold text-3xl">
        {/* Total price: {priceUpdate(totalPrice)} */}
      </p>
      {quantity >= 1 &&
        cart?.map((product) => (
          <div
            key={product.slug}
            className="flex justify-center items-center gap-12 mt-10  p-4 border-2 border-black rounded-md"
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
              <SelectQuantity quantity={quantity} setQuantity={setQuantity} />

              <div className="flx-col">
                <p>
                  Size: <strong> {product.size}</strong>
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg">{product?.name}</p>
              <p className=" text-black text-xl text-center">
                {/* {priceUpdate(product?.price * product.quantity)} */}
              </p>
            </div>
            <button className=" p-2 rounded-sm" onClick={handleDelete}>
              <X />
            </button>
          </div>
        ))}
    </main>
  );
};

export default Page;
