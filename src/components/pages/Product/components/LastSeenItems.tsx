"use client";
import React from "react";
import { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import { priceUpdate } from "@/utils/priceUpdate";
import Link from "next/link";

export const LastSeenItems = ({
  lastSeenItems,
  slug,
}: {
  lastSeenItems: GetProductBySlugQuery[] | undefined;
  slug: string;
}) => {
  const filteredItems = lastSeenItems?.filter(
    (item) => item?.product?.slug !== slug
  );

  return (
    <section className="flex justify-center container mx-auto items-center flex-col my-10 w-full gap-4 ">
      <Card className="px-6 bg-gray-100/10 pb-4 w-full min-w-[350px]">
        <CardHeader className="text-black font-black text-2xl self-start">
          <CardTitle>
            {filteredItems && filteredItems?.length === 1
              ? "Recently viewed item"
              : "Recently viewed items"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-8">
          {filteredItems &&
            filteredItems?.map((item) => (
              <Link
                href={`/item/${item.product?.slug}`}
                key={item?.product?.id}
              >
                <article className="border-[1px] border-gray-200 size-80 rounded-md gap-2 flex justify-center items-center flex-col transition">
                  <Image
                    src={item?.product?.images[0].url || ""}
                    alt={item?.product?.name || ""}
                    width={150}
                    height={150}
                    className="min-h-[120px] min-w-[120px] w-auto h-auto"
                  />
                  <p className="font-semibold self-start ml-4">
                    {item?.product?.name}
                  </p>
                  <p className="text-sm self-start ml-4 text-muted-foreground">
                    {item?.product?.description}
                  </p>
                  <p className="font-bold self-start ml-4">
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
