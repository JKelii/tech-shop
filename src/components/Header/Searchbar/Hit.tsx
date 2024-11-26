"use client";
import { priceUpdate } from "@/utils/priceUpdate";
import type { Hit as HitType } from "instantsearch.js";
import Image from "next/image";
import Link from "next/link";

type HitProps = {
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
      <div className="w-full h-full" key={hit.id}>
        <Link href={`/item/${hit.slug}`}>
          <article
            className="flex gap-4 min-w-72 w-full h-16 hover:bg-gray-100   rounded-lg"
            key={hit.id}
          >
            <Image
              src={hit.images}
              alt={hit.name}
              width={70}
              height={70}
              className="p-1"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm ">{hit.name}</p>
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
