"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { priceUpdate } from "@/utils/priceUpdate";

import type { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";

//TODO: FIX LAST SEEN ITEMS

export const LastSeenItems = ({
  lastSeenItems,
  slug,
}: {
  lastSeenItems: GetProductBySlugQuery[] | undefined;
  slug: string;
}) => {
  const filteredItems = lastSeenItems?.filter(
    (item) => item?.product?.slug !== slug,
  );

  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto my-10 flex w-full flex-col  items-center justify-center gap-4 ">
      <Card className="w-full min-w-[350px] bg-gray-100/10 px-6 pb-4">
        <CardHeader className="self-start text-2xl font-black text-black">
          <CardTitle>
            {filteredItems?.length === 1 && filteredItems.length > 1
              ? "Recently viewed item"
              : "Recently viewed items"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8 lg:flex-row">
          {filteredItems?.map((item) => (
            <Link href={`/item/${item.product?.slug}`} key={item?.product?.id}>
              <article className="flex size-80 flex-col items-center justify-center gap-2 rounded-md border border-gray-200 transition hover:border-gray-700">
                <Image
                  src={item?.product?.images[0].url || ""}
                  alt={item?.product?.name || ""}
                  width={150}
                  height={150}
                  className="size-auto min-h-[120px] min-w-[120px] rounded-lg"
                />
                <p className="ml-4 self-start font-semibold">
                  {item?.product?.name}
                </p>
                <p className="ml-4 self-start text-sm text-muted-foreground">
                  {item?.product?.description}
                </p>
                <p className="ml-4 self-start font-bold">
                  {priceUpdate(item?.product?.price || 0)}
                </p>
              </article>
            </Link>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
