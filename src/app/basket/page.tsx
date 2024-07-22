"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import useShopContext from "@/hooks/useShopContext";
import { X } from "lucide-react";

import SelectQuantity from "@/components/pages/Product/components/SelectQuantity";
import { checkCart, getCartFromCookie, removeFromCart } from "@/actions/cart";
import { useSession } from "next-auth/react";
import { string } from "yup";

const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { cart, setCart, quantity, setQuantity } = useShopContext();
  const session = useSession();

  const handleDelete = async (productSlug: string) => {
    const updatedCart = await removeFromCart({
      product: { slug: productSlug, quantity },
    });

    if (updatedCart !== null) {
      setCart(updatedCart);
    } else {
      setCart([]);
    }
    setQuantity(0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCartFromCookie();
      if (cartData) {
        setCart(cartData);
      }
    };
    fetchCart();
  }, [setCart]);

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
      {cart?.map((product) => (
        <div
          key={product.slug}
          className="flex justify-center items-center gap-12 mt-10 p-4 border-2 border-black rounded-md"
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
              <p className="text-lg">
                Size: <strong>{product.size}</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">{product?.name}</p>
            <p className="text-black text-xl text-center">
              {/* {priceUpdate(product?.price * product.quantity)} */}
            </p>
          </div>
          <button
            className="p-2 rounded-sm"
            onClick={() => handleDelete(product.slug)}
          >
            <X />
          </button>
        </div>
      ))}
    </main>
  );
};

export default Page;
