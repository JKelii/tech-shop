"use client";
import Image from "next/image";
import Link from "next/link";

import { priceUpdate } from "@/utils/priceUpdate";

import type { Hit as HitType } from "instantsearch.js";

export type HitProps = {
  hit: HitType<{
    name: string;
    id: string;
    images: string;
    price: string;
    slug: string;
  }>;
};

export const Hit = ({ hit }: HitProps) => {
  return (
    <>
      <div className="size-full" key={hit.id}>
        <Link href={`/item/${hit.slug}`}>
          <article
            className="flex h-20 w-96 min-w-72 gap-4 rounded-lg hover:bg-gray-100"
            key={hit.id}
          >
            <Image
              src={hit.images}
              alt={hit.name}
              width={70}
              height={70}
              className="rounded-lg object-contain p-1"
            />
            <div className="mt-1 flex flex-col gap-1">
              <p className="text-sm font-semibold ">{hit.name}</p>
              <p className="text-sm text-muted-foreground">
                {priceUpdate(Number(hit.price))}
              </p>
            </div>
          </article>
        </Link>
      </div>
    </>
  );
};
