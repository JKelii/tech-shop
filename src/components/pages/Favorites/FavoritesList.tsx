"use client";
import { ResponseGetFavorites } from "@/lib/mappers/getFavorites";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteFavoriteButton } from "./DeleteFavoriteButton";

export const FavoritesList = ({
  favoriteProducts,
}: {
  favoriteProducts: ResponseGetFavorites[] | undefined;
}) => {
  return (
    <>
      {favoriteProducts &&
        favoriteProducts?.map((item, index) => (
          <div
            className="flex border-[1px] border-gray-400 p-4 justify-center items-center rounded-md"
            key={index}
          >
            <Link
              href={`/item/${item.product?.slug}`}
              className="flex justify-center items-center"
            >
              <Image
                src={item.product?.image}
                width={200}
                height={200}
                alt={item.product?.name}
              />
              <div className="flex flex-col w-96 items-center justify-center gap-6 p-4 m-4">
                <h2 className="text-xl font-bold text-black">
                  {item.product?.name}
                </h2>
                <p className="text-sm text-muted-foreground ">
                  {item.product?.description}
                </p>
                <p className="text-lg text-black font-semibold">
                  {priceUpdate(item.product?.price)}
                </p>
              </div>
              <div className="flex justify-center items-center"></div>
            </Link>
            <DeleteFavoriteButton favoriteId={item.favoriteId} />
          </div>
        ))}
    </>
  );
};
