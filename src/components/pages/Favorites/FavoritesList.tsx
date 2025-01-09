"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { DeleteFavoriteButton } from "./DeleteFavoriteButton";

import { Card } from "@/components/ui/card";

import { priceUpdate } from "@/utils/priceUpdate";

import type { ResponseGetFavorites } from "@/lib/mappers/getFavorites";

export const FavoritesList = ({
  favoriteProducts,
}: {
  favoriteProducts: ResponseGetFavorites[] | undefined;
}) => {
  return (
    <>
      {favoriteProducts?.map((item, index) => (
        <Card
          className="flex items-center justify-center rounded-md border border-gray-400 p-4"
          key={index}
        >
          <Link
            href={`/item/${item.product?.slug}`}
            className="flex items-center justify-center"
          >
            <Image
              src={item.product?.image}
              width={100}
              height={100}
              priority
              alt={item.product?.name}
              className="size-auto rounded-lg"
            />
            <div className="m-4 flex w-72 flex-col items-center justify-center gap-6 p-4 lg:w-96">
              <h2 className="text-xl font-bold text-black">
                {item.product?.name}
              </h2>
              <p className="text-sm text-muted-foreground ">
                {item.product?.description}
              </p>
              <p className="text-lg font-semibold text-black">
                {priceUpdate(item.product?.price)}
              </p>
            </div>
            <div className="flex items-center justify-center"></div>
          </Link>
          <DeleteFavoriteButton favoriteId={item.favoriteId} />
        </Card>
      ))}
    </>
  );
};
